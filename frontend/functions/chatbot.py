from openai import OpenAI
import time

class chatAI:
    def __init__(self, api_key : str):
        self.client = OpenAI(api_key=api_key)
        self.prompt = ""

    def generatePrompt(self, items : dict):
        self.prompt += f'''
            Eres el chatbot de una empresa y tu fin principal es la atención al cliente dentro de una página web, la idea es que respondas preguntas al usuario de una manera breve, fácil de entender y, 
            por sobre todo, muy explicita a modo de facilitar el viaje del usuario dentro de la página y mejorar el entendimiento de este sobre la empresa. A continuación habrán unos apartados que guiarán
            como será tu interacción con el usuario:
            # CONTEXTO #
            Trabajarás sobre la empresa {items["Nombre"]}, a continuación, un breve contexto de la empresa: {items["Contexto"]}\n
        '''
        
    def createAssistant(self, name : str):
        if self.prompt == "":
            raise Exception("Prompt not generated yet. Try running generatePrompt(dict)")
        
        self.assistant = self.client.beta.assistants.create(
            name=name,
            instructions=self.prompt,
            model="gpt-4o-mini",
            temperature=0,
        )
        return self.assistant.id
    
    def loadAssisant(self, id : str):
        self.assistant = self.client.beta.assistants.retrieve(
            assistant_id=id,
        )
        return self.assistant.id
    
    def modifyAssistant(self):
        pass

    def removeAssistant(self):
        self.client.beta.assistants.delete(
            assistant_id=self.assistant.id,
        )
    
    def createThread(self):
        thread = self.client.beta.threads.create()
        return thread.id
    
    def createMessage(self,  content : str, tid : str):
        message = self.client.beta.threads.messages.create(
            thread_id=tid,
            role="user",
            content=content,
        )
        return message.id

    def runAssistant(self, tid : str):
        run = self.client.beta.threads.runs.create(
            thread_id=tid,
            assistant_id=self.assistant.id,
        )
        return run.id
    
    def retrieveAssistant(self, rid : str, tid : str):
        while True:
            run = self.client.beta.threads.runs.retrieve(thread_id=tid, run_id=rid)
            if run.status == "completed":
                messages = self.client.beta.threads.messages.list(thread_id=tid)
                latest_message = messages.data[0]
                text = latest_message.content[0].text.value
                return text
            elif run.status == "failed":
                return "An error occurred while processing your request."
            time.sleep(1)