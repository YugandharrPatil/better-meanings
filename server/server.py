from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import httpx

# import requests


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Item(BaseModel):
    word: str


@app.get("/")
def respondToRoot():
    return {"name": "Peter Thiel"}


@app.post("/")
async def getBetterMeaning(item: Item):
    async with httpx.AsyncClient() as client:
        res = await client.get(
            f"https://api.dictionaryapi.dev/api/v2/entries/en/{item.word}"
        )
    meaning = res.json()
    return {"meaning": meaning}


# @app.post("/")
# async def getBetterMeaning(item: Item):
#     # LOGIC
#     # 1. send the word to the API
#     # 2. send a "link to the article" OR "sentence" they're reading to the API
#     # 3. tell the API to give the meaning of the word in that article's/sentence's context
#     # 4. convey back the meaning to the user via return below
#     # 5. in the extension, handle the response and render the meaning to the user

#     # FOR NOW, DICTIONARY MEANING RESPONSE SENT
#     res = requests.get("https://api.dictionaryapi.dev/api/v2/entries/en/" + item.word)

#     return {"meaning": res}
