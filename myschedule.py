schedule = {
    "Monday Red - US": [
        "Clubs/Office Hours",
        "English 10: Lit & Comp II-A",
        "Specials",
        "Unscheduled",
        "Chemistry A",
        "Lunch and Office Hours",
        "Algebra II Accelerated",
    ],
    "Monday Black - US": [
        "Clubs/Office Hours",
        "Modern World History A",
        "Latin III",
        "Unscheduled",
        "Dialogue II-A",
        "Lunch and Office Hours",
        "Research Principles A",
    ],
    "Tuesday - US": [
        "Clubs/Office Hours",
        "Chemistry A",
        "Algebra II Accelerated",
        "Unscheduled",
        "English 10: Lit & Comp II-A",
        "Lunch 1",
        "Studio Art 10 A",
        "Latin III",
        "Modern World History A",
    ],
    "Wednesday - US": [
        "Clubs/Office Hours",
        "Intro to Computer Science 10-A",
        "English 10: Lit & Comp II-A",
        "Unscheduled",
        "Latin III",
        "Lunch 1",
        "Algebra II Accelerated",
        "Chemistry A",
    ],
    "Thursday - US": [
        "Clubs/Office Hours",
        "Algebra II Accelerated",
        "Modern World History A",
        "Unscheduled",
        "Research Principles A",
        "Lunch 1",
        "Chemistry A",
        "Community Time",
        "Dialogue II-A",
    ],
    "Friday - US": [
        "Clubs/Office Hours",
        "Latin III",
        "Studio Art 10 A",
        "Unscheduled",
        "Modern World History A",
        "Lunch 1",
        "Intro to Computer Science 10-A",
        "Community Time",
        "English 10: Lit & Comp II-A",
    ],
}

for day, classes in schedule.items():
    print(day)
    for cls in classes:
        print("  " + cls)
