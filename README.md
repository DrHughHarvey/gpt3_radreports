## Introduction

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
The are several gallstones within the gallbladder
```

In keeping with the recent trend towards a more patient-focussed model of healthcare, and increasing appetite for digital tools to enable and empower patients, this project aims to bridge the 'language' barrier that lies between radiologists and patients by using the powerful natural language capabilities of GPT3.

The project is in three parts:
1. Set up the API configuration in a virtual environment
1. Create a training pathway to 'prime' GPT3 for the specific task
1. Build a web interface to allow user input and visualisation of the output

## Basics

The code in this repo is based on @ShreyaShankar 's gpt3-sandbox`-> [here](https://github.com/shreyashankar/gpt3-sandbox)

The following has only been tested on MacOS Catalina.

* Obtain [OpenAI API key](https://beta.openai.com/)
* Install [python3](https://realpython.com/installing-python/) 
* Install [yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)






