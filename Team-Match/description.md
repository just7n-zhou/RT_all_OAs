# Team Selection App - Problem Description

## 📋 Overview
Create a React Team Selection component that displays a list of available players, allows users to view their details, select/remove them from a team, and sort the list by player attributes.

---

## 🎯 Functional Requirements

### A. User Interface Elements

#### 🏠 Welcome Message
- Show a welcome instruction message by default
- Must include an **(x)** button to close it

#### 👥 Available Players List
- Display a list/table of all players from the provided data

#### 📊 Player Details Card
- Clicking a player's name opens a detailed card showing all attributes
- Must have a **Close (x)** button

### B. Team Selection & Management

#### ➕ Selection
- Each player in the "Available" list has a **Select** button
- Clicking it adds them to the "Selected" list
- Disables the button in the original list

#### ➖ Removal
- Each player in the "Selected" list has a **Remove** button
- Clicking it removes them from the team
- Re-enables their "Select" button in the available list

#### 🔄 Sorting
- Users must be able to sort the available list by:
  - Name
  - Role
  - Batting Skill
  - Bowling Skill

### C. Team Composition Rules (Validation)

You must enforce these rules during selection:

| Position | Min | Max |
|----------|-----|-----|
| **Total Players** | - | **11** |
| **Batters** | **3** | **6** |
| **Bowlers** | **3** | **6** |
| **Wicket Keeper** | **1** | **1** |
| **All-Rounders** | **1** | **4** |

---

## ⚙️ Technical Notes & Project Constraints

### 🚫 Important Implementation Rules

#### Read-Only Files
**Do not modify or delete** the following files, as doing so results in a zero score:

```
src/App.js
src/App.test.js
src/index.css
src/index.js
src/players.json
src/registerServiceWorker.js
```

#### ✅ Editable Files
You should only modify these two files:

```
src/components/player-info/index.js
src/components/team-selection/index.js
```

#### 🏗️ Structure
Do not change the existing `data-testid` attributes, classes, or IDs provided in the boilerplate, as they are required for the automated test cases.

---

## 🧪 Required Testing Attributes (data-testid)

| Element Type | Location | Test-ID Format |
|--------------|----------|----------------|
| Table Row | Available Table | `available-<firstname>-<lastname>-row` |
| Table Cell | Available Table | `available-<firstname>-<lastname>-<attribute>` |
| Select Button | Available Table | `available-<firstname>-<lastname>-select` |
| Table Row | Selected Table | `selected-<firstname>-<lastname>-row` |
| Remove Button | Selected Table | `selected-<firstname>-<lastname>-remove` |
| Detail Card | Player Info | `player-<firstname>-<lastname>-details` |
| Attribute | Player Info | `player-detail-<firstname>-<lastname>-<attribute>` |
| Add Button | Player Info | `player-detail-<firstname>-<lastname>-add` |
| Close Button | Player Info | `player-detail-<firstname>-<lastname>-close` |

> **Note:** Replace `<firstname>` and `<lastname>` with the player's actual names (e.g., `Rohit-Sharma`).

---

## ⚠️ Important Notes

### Read-Only Files
The following files are marked read-only. You can see these files in the editor; however, it is possible from the terminal. **You must not modify or delete these files** because doing so results in a zero score.

```
src/App.js
src/App.test.js
src/index.css
src/index.js
src/players.json
src/registerServiceWorker.js
```

### Development Guidelines
- Components have specific `data-testid` attributes for test cases
- Certain classes and IDs are required for rendering purposes
- **It is advised not to change them**
- **Only modify** these files:
  - `src/components/player-info/index.js`
  - `src/components/team-selection/index.js`
- **Avoid making any changes** to the rest of the files in the project structure
