from app.models.quiz_models import QuizQuestion

# 10 Scientifically grounded questions based on provided sources (IPCC, Our World in Data, DEFRA)
QUIZ_QUESTIONS = [
    QuizQuestion(
        id="q1",
        question_text="Which produces more CO2 equivalent emissions globally?",
        options=["1kg of beef", "1kg of lentils", "1kg of poultry", "1kg of pork"],
        correct_option_index=0,
        explanation="Beef produces roughly 60-100 kg CO2e per kg, compared to <1 kg for lentils (Our World in Data).",
    ),
    QuizQuestion(
        id="q2",
        question_text="What is the approximate global average carbon footprint per person per year?",
        options=["2,000 kg CO2e", "4,000 kg CO2e", "8,000 kg CO2e", "12,000 kg CO2e"],
        correct_option_index=1,
        explanation="The global average is roughly 4,000 kg CO2e/year (Our World in Data 2023).",
    ),
    QuizQuestion(
        id="q3",
        question_text="To meet the Paris Agreement 1.5°C target, what should the average personal carbon footprint be by 2030?",
        options=["500 kg CO2e", "1,000 kg CO2e", "2,000 kg CO2e", "4,000 kg CO2e"],
        correct_option_index=2,
        explanation="The IPCC SR1.5 suggests an equitable target of around 2,000 kg CO2e/year to limit warming to 1.5°C.",
    ),
    QuizQuestion(
        id="q4",
        question_text="Which mode of transport typically emits the most CO2 per passenger kilometer?",
        options=[
            "National rail train",
            "Domestic short-haul flight",
            "Average petrol car with 4 passengers",
            "Local bus",
        ],
        correct_option_index=1,
        explanation="Short-haul flights are generally the most carbon-intensive transport mode per passenger km.",
    ),
    QuizQuestion(
        id="q5",
        question_text="What is the largest single contributor to household energy emissions in colder climates?",
        options=["Lighting", "Cooking", "Space heating", "Water heating"],
        correct_option_index=2,
        explanation="Space heating using fossil fuels (like natural gas) accounts for the vast majority of household emissions in cold climates.",
    ),
    QuizQuestion(
        id="q6",
        question_text="True or False: Buying local produce always results in a lower carbon footprint than imported produce.",
        options=["True", "False"],
        correct_option_index=1,
        explanation="False. What you eat matters more than where it comes from. Transport is usually a small fraction (<10%) of food's total footprint.",
    ),
    QuizQuestion(
        id="q7",
        question_text="Which of these actions has the highest potential to reduce your carbon footprint?",
        options=[
            "Recycling all plastics",
            "Washing clothes in cold water",
            "Living car-free",
            "Upgrading lightbulbs to LEDs",
        ],
        correct_option_index=2,
        explanation="Living car-free is a high-impact action that can save over 2,000 kg CO2e annually.",
    ),
    QuizQuestion(
        id="q8",
        question_text="How does a plant-based (vegan) diet's footprint compare to a high-meat diet?",
        options=[
            "It is about the same",
            "It is 10% lower",
            "It is 30% lower",
            "It is over 50% lower",
        ],
        correct_option_index=3,
        explanation="A vegan diet produces roughly 2.5 kg CO2e/day compared to 7.2 kg for a high-meat diet—a reduction of over 60%.",
    ),
    QuizQuestion(
        id="q9",
        question_text="What is 'embodied carbon' in consumption?",
        options=[
            "Carbon absorbed by trees",
            "Emissions from breathing",
            "Emissions generated during manufacturing and transport of goods",
            "Carbon stored in fossil fuels",
        ],
        correct_option_index=2,
        explanation="Embodied carbon refers to all emissions created prior to a product reaching the consumer.",
    ),
    QuizQuestion(
        id="q10",
        question_text="Which renewable energy source has seen the most rapid cost decline globally over the last decade?",
        options=["Geothermal", "Solar photovoltaics (PV)", "Hydropower", "Biomass"],
        correct_option_index=1,
        explanation="Solar PV costs have fallen dramatically (over 80% since 2010), making it the cheapest electricity in history in many places.",
    ),
]


def get_all_questions() -> list[QuizQuestion]:
    return QUIZ_QUESTIONS


def get_question_by_id(q_id: str) -> QuizQuestion | None:
    for q in QUIZ_QUESTIONS:
        if q.id == q_id:
            return q
    return None
