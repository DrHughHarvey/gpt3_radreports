##Introduction

Radiologists use a specific ontology for describing imaging findings in their reports. This language is esoteric and poorly understood by lay readers.
With the advent of few shot learning natural language models such as GPT3, it is now possible to train networks to convert input text into output text in a parameterised fashion, using only a few training examples.

The aim of this project is to build a simple web interface using the OpenAI GPT-3 API where the input prompt can be any clinical radiology report and the resulting output is an understandable lay version.

##Context

An example of the esoteric nature of radiology reports is:
'''markdown
There are several hyerechoic calcific foci within the gallbladder with significant posterior acoustic shadowing in keeping with cholecystolithiasis
'''
where the lay version may be translated as:
'''markdown
The are several gallstones within the gallbladder
'''

##Set up


