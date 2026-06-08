from doctor_summary import generate_summary
import json

with open("../output/extracted_data.json","r") as f:
    data = json.load(f)

summary = generate_summary(data)

print(summary)