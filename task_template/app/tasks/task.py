import os

# define the Task
from task_examples import poetry, tangram, gesture, openai_task, story

currentTask = os.environ.get("story")

if currentTask == "tangram":
    task = tangram.Tangram()
elif currentTask == "openai":
    task = openai_task.OpenAITask()
elif currentTask == "story":
    task = story.Story()
elif currentTask == "story_openai":
    task = story.StoryOpenAI()
elif currentTask == "gesture":
    task = gesture.Gesture()
elif currentTask == "poetry_openai":
    task = poetry.PoetryOpenAI()
else:
    task = poetry.Poetry()
