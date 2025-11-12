# HavFam - a Family Relationship Title Identifier
[![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=fff)](Python)

A web-based tool to determine the **culturally correct title for your relatives**, designed for Cambodian-Chinese kinship rules. Titles depend on **generation, gender, age, and parent-side relationships**.


## 🔹 Rules

**Parent’s Generation**

| Side | Relative              | Title | Spouse |
| ---- | --------------------- | ----- | ------ |
| Mom  | Older/Younger Brother | គូ    | គឹម    |
| Mom  | Sister                | អ៊ី     | ទ្រា   |
| Dad  | Younger Brother       | ចឹក   | សឹម    |
| Dad  | Older Brother         | បុិ   | អ៊ីម     |
| Dad  | Older/Younger Sister  | កូវ   | ទ្រា   |

**Your Generation**

| Gender | Older than you | Title | Spouse |
| ------ | -------------- | ----- | ------ |
| Male   | Yes            | ហ៊ា   | សោ    |
| Female | Yes            | ជែ    | និង   |


---

## 🔹 Quick Start

```bash
# Clone the repo
git clone https://github.com/phoeurnkimhor/havfam.git
cd havfarm

# install dependencies
pip install -r requirements.txt

# Run in Python
python main.py
```

