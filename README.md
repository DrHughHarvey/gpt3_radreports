# Introduction

Radiologists use a specific ontology for describing imaging findings in their reports. This language is esoteric and poorly understood by lay readers.
With the advent of few-shot learning natural language models such as GPT3, it is now possible to train billion paramter networks to convert input text into output text in a stylised fashion, using only a few training examples.

The aim of this project is to build a simple web interface using the`OpenAI GPT-3 API`where the input prompt can be any clinical radiology report and the resulting output is an understandable lay version.

## Context

Human translation of standard radiology reports into lay terms would be extremely time consuming, hence this is never done in routine clinical practice. Instead radiology reports are read by clinicians, and then summarised either verbally or via a clinic letter to their patient. Current radiological practice therefore is non patient-centric in that the end-user of the service neither receives their report, nor could understand their report if they did receive it. 

An example of the esoteric nature of radiology reports is:
```markdown
There are several hyerechoic calcific foci within the gallbladder with  
significant posterior acoustic shadowing in keeping with cholecystolithiasis
```
where the lay version may be translated as:
```markdown
There are several dense objects typical of gallstones within the gallbladder
```

In keeping with the recent trend towards a more patient-focussed model of healthcare, and increasing appetite for digital tools to enable and empower both physicians and patients, this project aims to bridge the 'language' barrier that lies between radiologists and patients by using the powerful natural language capabilities of GPT3.

The project is in three parts:
1. Set up the API configuration in a virtual environment
1. Create a training pathway to 'prime' GPT3 for the specific task
1. Build a web interface to allow user input and visualisation of the output

## Building the system

### Set up the API configuration in a virtual environment

The code in this repo is based on`ShreyaShankar's gpt3-sandbox`-> [here](https://github.com/shreyashankar/gpt3-sandbox)  
I also reocmmend this [youtube video](https://youtu.be/9g66yO0Jues) to explain various elements of this sandbox.

_The following has only been tested on MacOS Catalina_

* Obtain [OpenAI API key](https://beta.openai.com/)
* Install [python3](https://realpython.com/installing-python/) 
* Install [yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

Clone [this](https://github.com/DrHughHarvey/gpt3_radreports) repository, and in Terminal install the Python virtual environnment package, create a new virtual environment called 'gpt3' and activate it:  
```
pip3 install virtualenv  
pip3 -m venv $gpt3   
source gpt3/bin/activate
```
Install the requirements  
`pip install -r gpt3/api/requirements.txt`  
Save a file named openai.cfg into your api folder containing your API secret key as such:  
`OPENAI_KEY=sk-INSERTKEYHERE`  
Link your gpt3 virtual environment to the config file conatining the API key   
`OPENAI_CONFIG=gpt3/api/openai.cfg`  
  
    

### Create a training pathway to 'prime' GPT3 for the specific task

GPT3 can only 'solve' the task if it has been shown a few examples (known as 'few-shot learning'), so we need to create some cases for it to learn from - this is called _priming_. This is done using a simple python script. The full code is in `gpt3/examples/run_radiologyreports.py`  

To be able to send examples to GPT3 via our API we need create a 'GPT object' with the following parameters:   
*`engine` - this will be `davinci` which is the current version of the GPT3 engine  
*`temperature` - this is a setting between 0-1 which tells GPT3 how accurate or creative to  be - 0 being very accurate, 1 being more creative  
*`max_tokens` - how many characters do we want the output to be?  

```
gpt = GPT(engine="davinci", temperature=0.2, max_tokens=1000)
```
  
Next we create some examples we want to use to _prime_ GPT3.  
_You can change these, and add more, to help GPT3 better adjust to the task_   
```
gpt.add_example(Example("There are several hyerechoic calcific foci within the gallbladder with significant posterior acoustic shadowing in keeping with cholecystolithiasis", "There are several dense objects typical of gallstones within the gallbladder"))
gpt.add_example(Example("What are you?", "I'm an example."))
gpt.add_example(Example("What are you?", "I'm an example."))
gpt.add_example(Example("What are you?", "I'm an example."))
gpt.add_example(Example("What are you?", "I'm an example."))
gpt.add_example(Example("What are you?", "I'm an example."))
```
  
The examples I have used are as follows:  

### Example 1
```
*input*  
There are several hyerechoic calcific foci within the gallbladder with significant posterior acoustic shadowing in keeping with cholecystolithiasis.  
*output*  
There are several dense objects typical of gallstones within the gallbladder.  
```

### Example 2
```
*input*  
The lungs and pleura are clear and the cardiomedistinal silhouette is unremarkable. No rib lesions.  
*output*  
Normal chest X-ray. 
```

### Example 3
```
*input*  
No mass, haemorrhage or hydrocephalus. Basal ganglia and posterior fossa structures are normal. No established major vessel vascular territory infarct. No intra or extra axial collection. The basal cisterns and foramen magnum are patent. The air cells of the petrous temporal bone are non-opacified. No fracture demonstrated.  
*output*  
Normal CT head.  
```

### Example 4
```
*input*  
Low signal intensity foci seen in the posterior aspect of the peripheral zone at the level of the mid gland toward the apex measuring 0.9 cm on the left and 0.9 cm on the right with associated early enhancement and possible restricted diffusion. Findings are concerning for neoplastic foci.
*output*  
There are a couple of areas which could be cancerous in the outer part of the prostate.  
```

### Example 4
```
*input*  
Prominent bilobed paramedial extra-axial mass along the convexity centered at the level of the posterior frontal and anterior parietal lobes with prominent posterior dural tail and occlusion of the adjacent superior sagittal sinus. Prominent surrounding reactive edema, left greater than right. Mild lateral shift but no herniation. Smaller extraaxial mass overlying the right mid temporal lobe.  
*output*  
There is one large right-sided mass near the front of the brain, and another smaller one on the same side. These are likely to be tumours, with signs of brain swelling.  
```

### Example 4
```
*input*  
The heart size is normal and there is no pericardial effusion. The aorta and great vessels are normal in caliber. The central pulmonary arteries are patent with no evidence of embolus. There is no significant mediastinal, hilar, or axillary lymphadenopathy. The trachea and mainstem bronchi are patent. The esophagus is normal in course and caliber. The lungs are clear with no infiltrates, effusions, or masses. There is no pneumothorax. Scans through the upper abdomen are unremarkable. The osseous structures in the chest are intact.
*output*  
Nothing concerning was found.
```

### Build a web interface to allow user input and visualisation of the output  

Test the API is working by running the example script included in the repository:  
`python gpt3/examples/run_radiologyreports.py`  


Create a simple user interface configuration with a description, a button and some placeholder text  
```
config = UIConfig(
    description="Translate clinical radiology reports into lay versions",
    button_text="Go",
    placeholder="Lay version",
    show_example_form=True,
)
```

Load the web app  

```
demo_web_app(gpt, config)
```






