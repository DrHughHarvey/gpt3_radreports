import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))

from api import GPT, Example, UIConfig
from api import demo_web_app


# Construct GPT object and show some examples
gpt = GPT(engine="davinci", temperature=0.2, max_tokens=1000)

gpt.add_example(Example("There are several hyerechoic calcific foci within the gallbladder with significant posterior acoustic shadowing in keeping with cholecystolithiasis", "There are several dense objects typical of gallstones within the gallbladder"))
gpt.add_example(Example("The lungs and pleura are clear and the cardiomedistinal silhouette is unremarkable. No rib lesions.", "Normal chest X-ray."))
gpt.add_example(Example("No mass, haemorrhage or hydrocephalus. Basal ganglia and posterior fossa structures are normal. No established major vessel vascular territory infarct. No intra or extra axial collection. The basal cisterns and foramen magnum are patent. The air cells of the petrous temporal bone are non-opacified. No fracture demonstrated.", "Normal CT head"))
gpt.add_example(Example("Low signal intensity foci seen in the posterior aspect of the peripheral zone at the level of the mid gland toward the apex measuring 0.9 cm on the left and 0.9 cm on the right with associated early enhancement and possible restricted diffusion. Findings are concerning for neoplastic foci.", "There are a couple of areas which could be cancerous in the outer part of the prostate."))
gpt.add_example(Example("Prominent bilobed paramedial extra-axial mass along the convexity centered at the level of the posterior frontal and anterior parietal lobes with prominent posterior dural tail and occlusion of the adjacent superior sagittal sinus. Prominent surrounding reactive edema, left greater than right. Mild lateral shift but no herniation. Smaller extraaxial mass overlying the right mid temporal lobe.", "There is one large right-sided mass near the front of the brain, and another smaller one on the same side. These are likely to be tumours, with signs of brain swelling."))
gpt.add_example(Example("The heart size is normal and there is no pericardial effusion. The aorta and great vessels are normal in caliber. The central pulmonary arteries are patent with no evidence of embolus. There is no significant mediastinal, hilar, or axillary lymphadenopathy. The trachea and mainstem bronchi are patent. The esophagus is normal in course and caliber. The lungs are clear with no infiltrates, effusions, or masses. There is no pneumothorax. Scans through the upper abdomen are unremarkable. The osseous structures in the chest are intact.", "Nothing concerning was found on this scan"))

# Define UI configuration
config = UIConfig(
    description="Translate clinical radiology reports into lay versions",
    button_text="Go",
    placeholder="Lay version",
    show_example_form=True,
)

demo_web_app(gpt, config)
