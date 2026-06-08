from groq_parser import parse_medical_report

data = parse_medical_report(
    "../tests/sam.png"
)

print(data)