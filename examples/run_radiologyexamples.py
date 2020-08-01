import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))

from api import GPT, Example, UIConfig
from api import demo_web_app


# Construct GPT object and show some examples
gpt = GPT(engine="davinci", temperature=0.5, max_tokens=100)

gpt.add_example(Example("There are several hyerechoic calcific foci within the gallbladder with significant posterior acoustic shadowing in keeping with cholecystolithiasis", "There are several dense objects typical of gallstones within the gallbladder"))
gpt.add_example(Example("What are you?", "I'm an example."))
gpt.add_example(Example("What are you?", "I'm an example."))
gpt.add_example(Example("What are you?", "I'm an example."))
gpt.add_example(Example("What are you?", "I'm an example."))
gpt.add_example(Example("What are you?", "I'm an example."))

# Define UI configuration
config = UIConfig(
    description="Translate clinical radiology reports into lay versions",
    button_text="Go",
    placeholder="Lay version",
    show_example_form=True,
)

demo_web_app(gpt, config)
