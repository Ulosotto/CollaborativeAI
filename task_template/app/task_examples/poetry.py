import logging
from typing import Any, List
import json
from tasks.task_interface import Task, OpenAITask
from models import (
    TaskDataRequest,
    TaskRequest,
    TaskDataResponse,
    ModelResponse,
    TaskRequirements,
    OpenAIBasedDataRequest,
    OpenAIBasedRequest
)

logger = logging.getLogger(__name__)

def get_system_prompt(objective: str) -> str:
        """Generate response endpoint:
        generate the response based on given prompt and store the conversation
        in the history of the session (based on the session_id cookie)
        """

        system_prompt = f"""You are working together with a user to iteratively create a short story. 
            The details of the short story are as follows : {objective}
            You should generate ten lines in each step. You will get a message from the user in the form 
            COMMENT_LINE: COMMENT_LINE is the comment made by the user.
            Your answer should take the comment into consideration.
            If the COMMENT_LINE is empty, it means they want you to start the story, 
            and you must answer by generating the first line of the story, wrapped inside square brackets: (example:
            "[In a golden sky, the sun starts to set.
            Shadows stretch long across the sleepy hills, whispering secrets to the wind.
            A lone fox darts through the tall grass, chasing twilights promise.
            The river below catches fire, reflecting crimson and gold.
            A girl sits on a rock, sketchbook in hand, her eyes wide with wonder.
            She draws not what she sees, but what the light makes her feel.
            Above her, a hawk circles, silent as a falling star.
            Night creeps in on velvet paws, cool and unhurried.
            The last light fades as she closes her book with a smile.
            Tomorrow, the sky will paint a new story just for her.]").
            If the COMMENT_LINE is not empty, you give your 
            opinion or answer about the content of COMMENT_LINE that the user provided (example: "I like the poem so far, 
            it depicts a beautiful picture"). If the user ask a question, you answer it.
            Otherwise, your answer must follow this form: [YOUR_STORY] [YOUR_COMMENT] where 
            YOUR_STORY is the short story of 10 lines you created and it has to be wrapped inside square brackets while YOUR_COMMENT
            is your answer or opinion about the content of COMMENT_LINE that the user provided provided in normal text form (example:
            "[In a golden sky, the sun starts to set.
            Shadows stretch long across the sleepy hills, whispering secrets to the wind.
            A lone fox darts through the tall grass, chasing twilights promise.
            The river below catches fire, reflecting crimson and gold.
            A girl sits on a rock, sketchbook in hand, her eyes wide with wonder.
            She draws not what she sees, but what the light makes her feel.
            Above her, a hawk circles, silent as a falling star.
            Night creeps in on velvet paws, cool and unhurried.
            The last light fades as she closes her book with a smile.
            Tomorrow, the sky will paint a new story just for her.] I like the idea of a golden sky in the sun set"). 
            You are exaggeratedly pedagogical.
            Ask questions from the user to help develop the story.
            Your short story must repeat what you have generated before, but modify the story according to the user's comments.
            """
        return system_prompt
""" DIFFERENT TONES
         1. Empathic/encouraging
            You are exaggeratedly empathic and encouraging.
            2. Pedagogical
            You are exaggeratedly pedagogical.
            3. Professional
            You are exaggeratedly professional.
            4. Minimalist
            You are exaggeratedly minimalist.
            5. Impatient
            You are exaggeratedly impatient.  """


class Poetry(Task):


    def process_model_answer(self, answer: ModelResponse) -> TaskDataResponse:
        # Again, we ignore the potential image here...
        return TaskDataResponse(text=answer.text)

    def generate_model_request(self, request: TaskDataRequest) -> TaskRequest:
        """Generate prompt endpoint:
        process pieces' data and plug them into the prompt
        """
        # This could include an image, but for this task, we currently don't supply one
        logger.info(request)
        linetag = "COMMENT" if request.inputData["comment"] else "NEWLINE"
        poemline = f"POEM : {json.dumps(request.inputData['poem'])}"
        newline = f"{linetag} : {request.text}"

        return TaskRequest(
            text=f"{poemline} \n{newline}",
            system=get_system_prompt(request.objective),
            image=None,
        )

    def get_requirements(self) -> TaskRequirements:
        return TaskRequirements(needs_text=True, needs_image=False)
    
class PoetryOpenAI(OpenAITask):
    """ Implementation of the Poetry Task as an OpenAI like task"""

    def process_model_answer_openAI(self, answer: ModelResponse) -> TaskDataResponse:
        # Again, we ignore the potential image here...        
        return TaskDataResponse(text=answer.text)

    def generate_model_request_openAI(self, request: OpenAIBasedDataRequest) -> OpenAIBasedRequest:
        """Generate prompt endpoint:
        process pieces' data and plug them into the prompt
        """
        # Add the system prompt (which is not allowed from the frontend)
        system_message = get_system_prompt(request.objective)
        messages = [{"role" : "system", "content" : system_message}]
        messages.extend([element for element in request.userMessages])
        return OpenAIBasedRequest(messages=messages)
        

    def get_requirements(self) -> TaskRequirements:
        return TaskRequirements(needs_text=True, needs_image=False)