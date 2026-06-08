import json
import glob

def build_timeline():

    timeline = []

    files = glob.glob("../output/report_*.json")

    for file in files:

        with open(file, "r", encoding="utf-8") as f:

            data = json.load(f)

            report_date = (
                data.get("report_date")
                or data.get("date")
                or data.get("report_date")
            )

            tests = data.get("tests", [])

            for test in tests:

                test_name = test.get("test_name", "")

                if test_name.lower() == "fasting blood sugar":

                    try:

                        result = float(
                            str(test.get("result", "0"))
                            .replace("mg/dL", "")
                            .strip()
                        )

                        timeline.append({
                            "date": report_date,
                            "value": result
                        })

                    except:
                        pass

    timeline.sort(
        key=lambda x: x["date"]
    )

    return timeline


def analyze_trend(timeline):

    if len(timeline) < 2:

        return {
            "status": "insufficient_data",
            "message": "At least 2 reports are needed."
        }

    first_value = timeline[0]["value"]
    last_value = timeline[-1]["value"]

    difference = last_value - first_value

    if difference > 10:

        trend = "increasing"

    elif difference < -10:

        trend = "decreasing"

    else:

        trend = "stable"

    return {
        "metric": "Fasting Blood Sugar",
        "trend": trend,
        "start_value": first_value,
        "end_value": last_value,
        "change": difference
    }


def generate_insight(result):

    if result["trend"] == "increasing":

        return (
            f"Fasting Blood Sugar increased from "
            f"{result['start_value']} to "
            f"{result['end_value']} mg/dL. "
            f"This may indicate worsening glucose control."
        )

    elif result["trend"] == "decreasing":

        return (
            f"Fasting Blood Sugar decreased from "
            f"{result['start_value']} to "
            f"{result['end_value']} mg/dL. "
            f"This indicates improvement."
        )

    else:

        return (
            f"Fasting Blood Sugar remained stable "
            f"between {result['start_value']} and "
            f"{result['end_value']} mg/dL."
        )


def analyze_blood_sugar():

    timeline = build_timeline()

    trend_result = analyze_trend(
        timeline
    )

    if "status" in trend_result and trend_result["status"]:
        return trend_result

    insight = generate_insight(
        trend_result
    )

    return {
        "timeline": timeline,
        "analysis": trend_result,
        "insight": insight
    }