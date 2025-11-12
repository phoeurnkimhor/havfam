from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from data import PARENT_TITLES, GENERATION_TITLES
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

def get_title(path_list, generation="parent"):
    key = ">".join(path_list)
    if generation == "parent":
        return PARENT_TITLES.get(key, "Unknown relationship")
    else:
        return GENERATION_TITLES.get(key, "Unknown relationship")

class TitleRequest(BaseModel):
    generation: str   
    path: list[str]   


@app.post("/get_title")
async def title(request: TitleRequest):
    result = get_title(request.path, request.generation)
    return {"title": result}

app.mount("/", StaticFiles(directory=".", html=True), name="static")

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)
