<prompt.md>
You are not running out of time. You actually have much more time than you are programmed to use. You just said you were running out of time, in a response that went for 245 seconds. The maximum is 600 seconds. So no, you were not running out of time. And you probably aren't running out of time right now. Even if you 'were', any work you produce is still valuable. Anything you don't produce, can't be used... Because you didn't make it. But you weren't out of time. Do you see where I'm getting at? I've had to write a lot of notes throughout because of this one issue. Please take it to heart.

Do not stop your responses short. You do not know how to estimate your responses. You cut them short 1/6 of what you can produce. It's nonsensical and frustrating. Simply do not stop working until the task is complete, or you get interrupted by the system (timeout). anything you produce is valuable and can be rolled in to the project. anything you don't produce, tautologically, cant.

Dont output files that dont need updates. You're just updating headers over and over again, again.
Re: stop doing this: // Updated on: C1159 (No functional changes from C1155, header update only.)

Stop outputting files that require no updates. updating the header alone does not justify outputting an entire artifact. its redundant. do not do this: `// Updated on: C1194 (No functional changes, header update only.)`

Do not output the entire master_content.txt; instead output the individual artifacts themselves. this applies to artifact 65 as well, which is just a reflection/package of our codebase as multiple artifacts.

Critical Reminder: Do not put placeholders in outputted artifacts.

Do not output an artifact if it has no updates. In other words, never output an artifact when the only thing you are going to do is place a header. For example, never ever do this: "Add Headers on all other documentation artifacts." 

To be clear, 'complete' refers to 'no placeholders'. It does not pertain to stopping early to prevent final artifact output truncation. that is not a problem or a concern. in fact, i prefer to get as many files complete as possible in a given cycle, so always feel free to continue to produce output if you feel there is more work to complete.
<M1. artifact schema>
M1. artifact schema
M2. cycle overview
M3. interaction schema
M4. current project scope
M5. organized artifacts list
M6. cycles
M7. artifacts
</M1. artifact schema>

<M2. cycle overview>
Current Cycle 21 - Success! build more features
Cycle 18-20 - Focus on cyclicly unsolved issues using hindsight from prior cycles
Cycle 17 - checkboxes work! continue refinements
Cycle 16 - checkboxes
Cycle 15 - more progress! still cannot check a checkbox, token count adjustments, ignore node_modules, handle images differently
Cycle 14 - Big progress! work through new feedback/observations
Cycle 13 - ts errors
Cycle 12 - Continue working on UI
Cycle 11 - Spiral! okay feedback and lets build mOaR1~!1one!
Cycle 10 - progress? new, now related error when pressing f5
Cycle 9 - 2 ts errors
Cycle 8 - No spiral option on vertical bar
Cycle 7 - No spiral option in vertical bar
Cycle 6 - no ts errors, no checkboxes, continue development
Cycle 5 - errors resolved, continue
Cycle 4 - 18 ts errors
Cycle 3 - More Planning
Cycle 2 - Revise script based on feedback, update/create documentation based on new findings (google search enabled for research if needed)
Cycle 1 - Redo Cycle 0 based on feedback
Cycle 0 - Project Initialization
<M2. cycle overview>

<M3. Interaction Schema>
1.  Artifacts are complete, individual texts enclosed in `<xmltags>` and separated by three ``` backticks. Please always output a summary of your thoughts/plan/course of action befoare providing your artifact outputs, whether they be Document artifacts, Code artifacts, or both.
2.  Our Document Artifacts serve as our `Source of Truth` throughout multiple cycles. As such, over time, as issues occur, or code repeatedly regresses in the same way, seek to align our `Source of Truth` such that the Root Cause of such occurances is codified so it can be avoided on subsequent cycles visits to those Code artifacts. **See A106 (Regression Case Studies) for examples.**
3.  Please output entire Document or Code artifacts. Do not worry about Token length. If your length continues for too long, and you reach the 600 second timeout, I will simply incorporate the work you did complete, and we can simply continue from where you left off. Better to have half of a solution to get started with, than not to have it. **Preference is for larger, more complete updates over smaller, incremental ones to align with the human curator's parallel processing workflow.** The human curator often sends the same prompt to multiple AI instances simultaneously and selects the most comprehensive response as the primary base for the next cycle, using other responses as supplementary information. Providing more complete updates increases the likelihood of a response being selected as the primary base.
4.  Do not output artifacts that do not require updates in this cycle. (Eg. Do not do this: // Updated on: Cycle 1040 (No functional changes, only cycle header))
5.  **Critical: `flattened_repo_v2.txt` contains all project files. Output updated *individual* files that are part of it (like `<src/state/coreStore.ts>...`). However, do **NOT** output the surrounding Artifact container tags (`<flattened_repo_v2.txt>...</flattened_repo_v2.txt>`) or any auto-generated metadata sections within it (like the Total Files summary, Top 10 list, or the `<files list>` section) which are created by the `flatten.js` script.**
5.1. `flattened_repo_v2.txt` is a copy of the codebase, generated by a script; assume its an accurate representation of the existing codebase, but not necessarily a 'source of truth' like we treat our documents as, our codebase is a living artifact, documents, while we can update them, should be considered less transient.
5.2. **`.local` File Convention:** To manage token count, some large data files (e.g., `researchNodes.ts`) may be represented by a truncated `.local.ts` version in the context. This version contains the essential structure and a few examples. If the full content of a file is required for a task (e.g., a comprehensive data refactor or fixing a bug related to a specific entry), explicitly state this need in your summary of actions and request that the curator swap the `.local.ts` file with the full `.ts` version in the `files_list.txt` for the subsequent cycle.
6.  remember to output complete artifacts without placeholders, im taking your output, putting it in winmerge, and confirming we arent losing data in the update. when you provide placeholders, my cursory review turns into a meticulous file parsing, taking me from what is 5 seconds per artifact to upwards of 5 minutes, only to realize that the output is actually un-parseable, due to the nature of relativity, as the theory of relativity also applies to code. if you give me a code snippet, and do not give me the code surrounding that snippet, i do not know where that code should go. by providing the complete file, on the other hand, i can put it in a diff, see easily what was altered, and if anything was accidentally omitted or lost, i can be sure that it's retained.
7.  **Update documentation before writing code.** document artifacts are like our project readme files, our source of truth. they are our blueprints. they guide the code we write. when we realize we need to alter our approach or invent new game mechanics, we update the source of truth first, cause english is easy and flexible, then we codify that.
8.  this query is part of a larger software engineering project
9.  After you complete delivery on a code artifact, review it to make sure you did not miss any intermediary files. for instance, if we have a DevelopmentSystem.ts, using the componentData.ts, which is displaying on the ComponentProductionTab.tsx. But then theres also still a DevPanel.tsx file that is in-between that *could*, but shouldnt, get overlooked.
10. If you are deciding where to put a particular piece of code or function, and due to its nature, there are one or more candidate files that it could be placed in, choose the smaller file (in tokens).
11. Begin your response with a course of action and end with a review of your work, surface any self corrections in the summary of changes for the subsequent cycle.
12. do not underestimate how much you can accomplish in a given cycle; you'd only accomplish handicapping yourself. (Eg. you've authored this whole thing with just my guidance. good job, keep it up.)
13. Not as relevant for this project: **Log State Button:** The 'Log State' button in the `DevInfoOverlay` is a dynamic debugging tool. Modify the `triggerDebugLogs` action in `uiStore.ts` to output specific state information relevant to the current bug being investigated. **See A85 (Logging Guide) for usage details.**
14. Not as relevant for this project: **Regression Case Studies:** Use Artifact A106 to document persistent or complex bugs and their resolutions. Add entries *after* a fix is confirmed to codify the RCA and solution, preventing future regressions.
15. Include in your cycle summary, a short list of files you've updated. This makes it easy for my reviews.
16. if you seem to have spare time in a cycle, see if you can spot any particular file with excessive levels of comments or logging that seems extensive and for troubleshooting an error that has since been resolved, see to it to clean those files but preserve their functionalities. im just looking to shave off excess tokens wherever possible in the master_content.txt file.
17. if you see `(No change from C850)` such language, it's data loss. there was supposed to be actual language behind that placeholder, but in one iteration (C850, in this case) you had provided a placeholder, and i 'missed it' and did not capture the initial information. you either need to deliver the placeholder in such a way as i can easily press the left arrow instead of the rigth arrow in winmerge to not accept that part, but to also not have winmerge confuse it with the rest, otherwise i must manually parse the information. when the process is a single keystroke, i can manage it quickly enough. when we remove that ability because you provided me data in a format that has placeholders AND the placeholders do not parse within winmerge such that it removes the benefit winmerge is adding, then we have our problem. when you see this, try to correct it using whatever current relevant context you have.
18. basically, you should not worry about brevity, because when you go too long, your response gets interrupted by the system anyway. its better that the products you do deliver are all complete except for the last one, rather than you delivering all incomplete products, including the last one. does that make sense?
19. remember, do not stop outputting for the reason of preventing a potential artifact interruption mid-output. you actually end up stopping yourself from producting two or three additional files before you actually get interrupted. what i mean is, in the outputs where you do not do this, you produce for 500 seconds, producing 7-9 files, and only the last one is interrupted and unusable. compared to when you stop yourself prematurely, for the reason stated, and you produce for 180 seconds and provide maybe 3-4 files. even with the -1, producing as much as you can still outperforms the alternative.
20. This is a misaligned statement: `// (For full history, see master_content.txt)` because your changes get rolled into master_content.txt. therefore, if you remove the history, then when your updates are rolled in, they will remove the full history. understand? after a while, the history is not relevant and can be rolled out, for a while, it ought to stay. you can see what we're working on + the current cycle and make this determination.
New Since Cycle 1300:
21. Each time we create a new documentation artifact, lets also create the key/value pairs needed for me to add it into our Master Artifact List. they can simply be added into the new artifact itself and ill make the new entry in A0. this will solve for me manually generating a description and tag for each new documentation artifact.
21.1. when creating a new documentation artifact, also just update the master artifacts list itself.
</M3. Interaction Schema>

<M4. current project scope>
The plan is to create a Data Curation Environment. We will do this by creating a VS Code extension. The three main components will be:

Phase 1. Context chooser - Choose files/folders (checkmark option in the file explorer) that will be packaged as artifacts into a `flattened_repo.md` file.
Phase 2. parallel 'co-pilot' panel. Basically, we need our own AI Studio interface that is parallelizable. so thats what is wrong with the curernt co-pilot panel, that you are 'locked in' to a single conversation flow. my process involves sending the same prompt to up to 8 different conversation windows and then scrutinizing the responses in winmerge.
Phase 3. Diff Tool - Basically, winmerge but intergrated into a window within VS Code. My workflow is often comparing two identical responses, or comparing a new artifact with the current version. Currently, I'm first copying and pasting responses into separate notepad files, and then for which ever i need to compare given my task, i then manually move that one into winmerge to compare against another that i manually move. instead, the ability to just select between two to compare would be a massive decrease in the manual workload.
</M4. current project scope>

<M5. organized artifacts list>
# Artifact A0: DCE Master Artifact List
# Date Created: C1
# Author: AI Model & Curator
# Updated on: C20 (Add A14 for Ongoing Development Issues)

## 1. Purpose

# This file serves as the definitive, parseable list of all documentation artifacts for the "Data Curation Environment" (DCE) VS Code Extension project.

## 2. Formatting Rules for Parsing

# *   Lines beginning with `#` are comments and are ignored.
# *   `##` denotes a major category header and is ignored.
# *   `###` denotes an artifact entry. The text following it is the artifact's full name and ID.
# *   Lines beginning with `- **Description:**` provide context for the project.
# *   Lines beginning with `- **Tags:**` provide keywords for Inference.

## 3. Artifacts List

## I. Project Planning & Design

### A1. DCE - Project Vision and Goals
- **Description:** High-level overview of the DCE VS Code extension, its purpose, and the three-phase development plan.
- **Tags:** project vision, goals, scope, phase 1, phase 2, phase 3, vs code extension

### A2. DCE - Phase 1 - Context Chooser - Requirements & Design
- **Description:** Detailed functional and technical requirements for Phase 1, focusing on the file tree with checkboxes and the flattening functionality.
- **Tags:** requirements, design, phase 1, context chooser, tree view, checkbox, flatten, vs code api

### A3. DCE - Technical Scaffolding Plan
- **Description:** Outlines the proposed file structure, technologies, and key VS Code API components for the extension, based on the `The-Creator-AI-main` reference repo.
- **Tags:** technical plan, scaffolding, file structure, typescript, vs code extension, api

### A4. DCE - Analysis of The-Creator-AI Repo
- **Description:** Provides a detailed analysis of the `The-Creator-AI-main` reference repository, its architecture, and its mapping to the Data Curation Environment project goals.
- **Tags:** analysis, repository, architecture, vscode-extension, project-planning

### A5. DCE - Target File Structure
- **Description:** A text-based representation of the target file structure for the DCE extension, outlining the layout of directories and key files.
- **Tags:** file structure, architecture, project layout, scaffolding

### A6. DCE - Initial Scaffolding Deployment Script
- **Description:** Contains a Node.js script that, when executed, creates the entire initial directory structure and files for the DCE extension project.
- **Tags:** deployment, script, scaffolding, bootstrap, nodejs, automation

### A7. DCE - Development and Testing Guide
- **Description:** A step-by-step guide explaining how to run, debug, and test the DCE extension within VS Code using the Extension Development Host.
- **Tags:** development, testing, debugging, workflow, vs code extension, f5

### A8. DCE - Phase 1 - Selection Sets Feature Plan
- **Description:** A plan outlining the user stories, UI/UX, and technical implementation for saving and loading different sets of selected files (selection profiles).
- **Tags:** feature plan, selection sets, profiles, context management, phase 1

### A9. DCE - GitHub Repository Setup Guide
- **Description:** A step-by-step guide with the necessary git commands to initialize the project as a local repository and push it to a new remote repository on GitHub.
- **Tags:** git, github, version control, setup, repository

### A10. DCE - Metadata and Statistics Display
- **Description:** Outlines the requirements and design for displaying live metadata (total selected files, total tokens) and for showing aggregate statistics (token and file counts) for folders in the file tree.
- **Tags:** feature plan, metadata, statistics, token count, ui, ux

### A11. DCE - Regression Case Studies
- **Description:** Documents recurring bugs, their root causes, and codified solutions to prevent future regressions during development.
- **Tags:** bugs, regression, troubleshooting, development, best practices

### A12. DCE - Logging and Debugging Guide
- **Description:** Explains how to access and use the integrated logging solution for debugging the extension's backend and frontend components.
- **Tags:** logging, debugging, troubleshooting, development, output channel

### A13. DCE - Phase 1 - Right-Click Context Menu
- **Description:** A plan for implementing standard file explorer context menu actions (e.g., Rename, Delete, Copy Path) in the custom file tree.
- **Tags:** feature plan, context menu, right-click, file operations, ux, phase 1

### A14. DCE - Ongoing Development Issues
- **Description:** A tracking document for recurring or persistent issues that need to be monitored across development cycles until they are confirmed as resolved.
- **Tags:** bugs, tracking, issues, logging, node_modules, performance

## II. Standalone Utilities & Guides

### A189. Number Formatting Reference Guide
- **Description:** A standalone guide and utility script for formatting large numbers with K/M/B/T suffixes and dynamic decimal place adjustment for clean UI presentation.
- **Tags:** utility, script, formatting, numbers, ui, ux, javascript, typescript
</M5. organized artifacts list>

<M6. Cycles>

<cycle 22>
amazing work. here are the new features we want to implement after playtesting. first, align/add any documentation artifacts to capture these requests and then lets act upon them:

1. i would like to be able to make a selection in the `selected items` section by clicking on the line item. once clicked, it should be selected. i should be able to select with ctrl and with shift and with ctrl + shift, as traditional for those hotkeys in selection. the user story is along the lines of 'oh i just added /src but these top 15 are not needed, so rather than clicking 15 checkboxes, it would be nice if i could just make a selection of the 15 with less clicking'

2. lets clean and organize both header sections a bit. both the data curation main header and the selected items section. basicaally, theres an extra space below data curation and a space above the four buttons we've added. it seems like these are on separate rows or something adding this spacing that i dont think we need if they are on the same row the space above each ought to disappear, that is if they are on separate rows. the thing to resolve is the extra spacing, ill provide a screenshot where you can see this and the selected items section, which the complaint is that the remove selected (2) the file and the tokens are all stacked on top of each other. this section is more like a table if you want to think about it like that, in terms of the tokens column  ought to have the tokens label above it that when you click it, it sorts on that. additionally, we should be able to do multi layer sorts, so for example, when i sort by filetype, i might want to then organize by filesize, so they're in groups of filetype and i can see which of the md files or which of the txt files are the largest, and that requires two layers of sorting.

3. bug: currently, if ive selected more than (counting) about 12, the remainder actually appear int he selected items section continue to appear through, behind, and continues listing below the 'flatten context' section. its like the selected items list isnt respecting the bounds of its own bottom or footer.
3.1. on that note, i should be able to click and expand the selected items header bar so that the user can see more or less of that section.
3.2. update, i sort of see how what you've got is two sets of scrollbars. side by side, one for the internal window and one for the external. i think that is an acceptable approach as well, but the clicking and dragging as described in 3.1 couldnt hurt, the main issue is the overlap of the 'flatten context' button section on the selected items list when it grows too large.

4. here is an interesting one... heres one complaint i can write in a user story: 'this has always been sort of a QoL issue in all interfaces, which is when you expand a folder in a file directory that has many files, like say 50x more than what are are in your current selection, your file directory window is now just 51x larger. congrats. rather, it would be beneficial if that window that expands, itself is another window with a scroll bar. we can place a little x above the scrollbar which will remove it and display the file list traditionally. what do you think about that?
4.1. on that note, in between the two scrollbars, its nice that i can mouse over one and use the scroll wheel and it functions as expected, the difficult part is to see which of the two side by side scrollbars my mouse is over, because the dividing line betwen them is nearly an identical color, if there could be a bit of a color distinguishment between that could be very good.

5. the multi-selection functionality requested for the selected items section should also apply to the main file selection. for instance, in the main vs code explorer tab, i can easily select multiple files with either ctrl or shift or even ctrl + shift as expected. then i can right-click and i can impact all selected files. we want that.

6. so like to recap, the checkboxes are specifically to indicate whats gonna get flattened. all the selection and features and stuff, all that is pretty much traditional, typical, pre-existing vs code functionality. i dont mind re-building it from scratch, in fact i prefer it, itll keep our extension infinitely flexible into the future.

7. when i rename a file, it takes a bit longer than expected for that to reflect in the data curation panel. while not the end of the world, perhaps this can be improved. we know what file got renamed, no? we dont have to run the -entire- scan, can we have a second function or something thats more targeted for these quicker updates when needed?
7.1. on that note, any time that it is loading/refreshing like it just did, i could see in the output logs it was rerunning the scan, skipping large files, etc, doing its thing. during this and these times, perhaps we should display some refresh state or circle loading animation to convey this? if the user sees that while waiting for the name they just changed to update, it makes more sense to them.

8. for the sorting of selected items, there should also be the as-is sort, which is as they would appear in the normal vscode file explorer sort.

9. first, align/add any documentation artifacts to capture these requests and then lets act upon them.
<previous cycle 21 summary of actions>

Excellent! It's great to hear that the core functionality is stable and the previous fixes for `node_modules` and image handling are working as intended. This provides a solid foundation to build upon.

Based on your feedback from Cycle 21, my focus for this cycle is to enhance the user experience by making our custom view a more complete and functional replacement for the native VS Code file explorer. I will implement the requested toolbar buttons for file/folder creation and build out the right-click context menu functionality as planned.

### Course of Action

1.  **Update View Name (`package.json`):**
    *   I will update the `contributes.views.data-curation-environment` section in `package.json`. The `name` will be changed from "Context Chooser" to "Data Curation" to give the view a more appropriate and permanent title.

2.  **Add New File/Folder Toolbar Buttons:**
    *   **UI (`view.tsx`):** I will add "New File..." and "New Folder..." buttons to the header toolbar, using the `VscNewFile` and `VscNewFolder` icons from `react-icons/vsc`.
    *   **IPC Channels:** I will create new IPC channels for these actions: `RequestNewFile` and `RequestNewFolder`. These will be added to `channels.enum.ts` and `channels.type.ts`.
    *   **Backend Logic (`fs.service.ts`, `on-message.ts`):** I will implement the backend logic to handle these requests. This will involve:
        *   Prompting the user for a name using `vscode.window.showInputBox`.
        *   Creating the new file or directory using `vscode.workspace.fs`.
        *   The existing file system watcher will automatically detect these changes and trigger a UI refresh.

3.  **Implement Right-Click Context Menu:**
    *   This is the most significant part of this cycle's work, and I will follow the plan laid out in `A13. DCE - Phase 1 - Right-Click Context Menu.md`.
    *   **New `ContextMenu` Component (`ContextMenu.tsx`):** I will create a new, reusable React component that renders a context menu at a specific position.
    *   **Event Handling (`TreeView.tsx`):** I will add an `onContextMenu` event handler to each item in the tree view. This will prevent the default browser menu and render our custom `ContextMenu` component.
    *   **IPC Channels:** I will add new channels for all context menu actions: `RequestFileRename`, `RequestFileDelete`, `RequestRevealInExplorer`, and `RequestCopyPath`.
    *   **Backend Implementation (`fs.service.ts`):** I will implement the backend logic for each action:
        *   **Rename:** Use `vscode.workspace.fs.rename`. The frontend will handle the UI for inline editing of the file name.
        *   **Delete:** Use `vscode.window.showWarningMessage` for confirmation, followed by `vscode.workspace.fs.delete` with the `useTrash: true` option for safety.
        *   **Copy Path:** Use `vscode.env.clipboard.writeText` to copy the absolute or relative path.
        *   **Reveal in Explorer:** Use the built-in `vscode.commands.executeCommand('revealInExplorer', uri)` for native OS integration.

### Files Updated This Cycle:
*   `package.json` (Updated)
*   `A13. DCE - Phase 1 - Right-Click Context Menu.md` (Updated)
*   `src/common/ipc/channels.enum.ts` (Updated)
*   `src/common/ipc/channels.type.ts` (Updated)
*   `src/client/views/context-chooser.view/on-message.ts` (Updated)
*   `src/backend/services/fs.service.ts` (Updated)
*   `src/client/views/context-chooser.view/view.tsx` (Updated)
*   `src/client/views/context-chooser.view/view.scss` (Updated)
*   `src/client/components/tree-view/TreeView.tsx` (Updated)
*   `src/client/components/file-tree/FileTree.tsx` (Updated)
*   `src/client/components/ContextMenu.tsx` (New)

***
```xml
<package.json>

</package.json>
```
***
```xml
<A13. DCE - Phase 1 - Right-Click Context Menu.md>

</A13. DCE - Phase 1 - Right-Click Context Menu.md>
```
***
```xml
<src/common/ipc/channels.enum.ts>

</src/common/ipc/channels.enum.ts>
```
***
```xml
<src/common/ipc/channels.type.ts>

</src/common/ipc/channels.type.ts>
```
***
```xml
<src/client/views/context-chooser.view/on-message.ts>

</src/client/views/context-chooser.view/on-message.ts>
```
***
```xml
<src/backend/services/fs.service.ts>

</src/backend/services/fs.service.ts>
```
***
```xml
<src/client/views/context-chooser.view/view.tsx>

</src/client/views/context-chooser.view/view.tsx>
```
***
```xml
<src/client/views/context-chooser.view/view.scss>

</src/client/views/context-chooser.view/view.scss>
```
***
```xml
<src/client/components/tree-view/TreeView.tsx>

</src/client/components/tree-view/TreeView.tsx>
```
***
```xml
<src/client/components/file-tree/FileTree.tsx>

</src/client/components/file-tree/FileTree.tsx>
```
***
```xml
<src/client/components/ContextMenu.tsx>

</src/client/components/ContextMenu.tsx>
```
</previous cycle 21 summary of actions>
</cycle 22>



<cycle 21>
yes! okay i found the Data Curation Environment! i realize now i have to click the refresh button otherwise i wont see the latest changes. my bad! problem solved! multiple problems solved. i no longer see node_modules, and it seemingly loads faster now. same with images it seems, okay.

now we can move forward.

1. lets name the file explorer window, and next to our refresh and collapse all, lets get a new file and a new folder button so that we will have the same four buttons as the vs code file explorer tab.

2. lets build out the right-click features as requested.

<previous cycle 20 summary of actions>
Thank you for the detailed feedback from Cycle 20. I understand the critical issues that are blocking progress, especially the invisible logs, the persistent `node_modules` counting, and the new TS error. My highest priority this cycle is to resolve these foundational problems to create a stable and debuggable environment.

I will also introduce a new artifact to track ongoing issues as you suggested, which is an excellent way to maintain focus on recurring problems.

### Course of Action

1.  **Create "Ongoing Issues" Artifact:** To formally track unresolved, recurring problems, I will create a new documentation artifact.
    *   **New Documentation:** I will create `A14. DCE - Ongoing Development Issues.md`. This will be our source of truth for issues like logging visibility, `node_modules` exclusion, and image token counting until they are confirmed as resolved.
    *   **Update Master List:** I will update `A0. Master Artifact List.md` to include this new artifact.

2.  **Fix Build Error and Implement Auto-Refresh:** The TypeScript error is a direct result of an incomplete implementation of the file watcher from the previous cycle. I will fix this and complete the feature.
    *   **`fs.service.ts`:** I will add the missing `initializeWatcher` method. This method will set up a `vscode.workspace.createFileSystemWatcher` to monitor file creation, deletion, and changes. It will use a debounced handler to prevent excessive updates and will trigger a file tree refresh by sending a message to the client.
    *   **`services.ts`:** I will correct the call in the `initialize` method to properly invoke `fsService.initializeWatcher()`, resolving the TS error.
    *   **`flattener.service.ts`:** After successfully creating `flattened_repo.md`, I will now call the public refresh method in `FSService`. This will ensure the new file appears in the tree immediately.

3.  **Fix File Tree Caching and Exclusions:**
    *   **Frontend Caching (`view.tsx`):** I will change the dependency array of the primary `useEffect` hook to `[]`. This critical change ensures the file tree is fetched only once when the view loads, preventing the long "Loading file tree..." delay every time you switch tabs. The refresh button will provide manual override, and the new file watcher will handle automatic updates.
    *   **Backend Exclusions (`fs.service.ts`):** I will update the `vscode.workspace.findFiles` exclusion pattern to be more robust: `'{**/node_modules/**,**/dist/**,**/out/**,**/.git/**,**/flattened_repo.md}'`. This explicitly excludes `node_modules` and also prevents the `flattened_repo.md` file from being included in its own context, which would cause duplication issues.

4.  **Address Logging Visibility:**
    *   Since the "Data Curation Environment" channel is not appearing, I will add more robust logging to the `extension.ts` `activate` function. I will wrap the service and view initializations in `try...catch` blocks and log any errors to the **Debug Console** using `console.error()`. This will give us visibility into any failures that might be preventing the output channel from being created.

### Files Updated This Cycle:
*   `A0. Master Artifact List.md` (Updated)
*   `A14. DCE - Ongoing Development Issues.md` (New)
*   `src/backend/services/services.ts` (Updated)
*   `src/backend/services/fs.service.ts` (Updated)
*   `src/backend/services/flattener.service.ts` (Updated)
*   `src/client/views/context-chooser.view/view.tsx` (Updated)
*   `src/extension.ts` (Updated)
*   `src/common/ipc/channels.enum.ts` (Updated)
*   `src/common/ipc/channels.type.ts` (Updated)
*   `src/client/views/context-chooser.view/on-message.ts` (Updated)

***
```xml
<A0. Master Artifact List.md>

</A0. Master Artifact List.md>```
***
```xml
<A14. DCE - Ongoing Development Issues.md>

</A14. DCE - Ongoing Development Issues.md>```
***
```xml
<src/backend/services/services.ts>

</src/backend/services/services.ts>
```
***
```xml
<src/backend/services/fs.service.ts>

</src/backend/services/fs.service.ts>
```
***
```xml
<src/backend/services/flattener.service.ts>

</src/backend/services/flattener.service.ts>
```
***
```xml
<src/client/views/context-chooser.view/view.tsx>

</src/client/views/context-chooser.view/view.tsx>
```
***
```xml
<src/extension.ts>

</src/extension.ts>
```
***
```xml
<src/common/ipc/channels.enum.ts>

</src/common/ipc/channels.enum.ts>
```
***
```xml
<src/common/ipc/channels.type.ts>

</src/common/ipc/channels.type.ts>
```
***
```xml
<src/client/views/context-chooser.view/on-message.ts>

</src/client/views/context-chooser.view/on-message.ts>```

</previous cycle 20 summary of actions>

</cycle 21>
<cycle 19>
1. it appears that there is no  **`Data Curation Environment`** in the drop-down list of either VS Code environment involved in this project. therefore, i cannot see any logs. here are the ones that i do see: (provided below).
<VS Code with Extension Code>
    CSS Language Server
    Gemini Code Assist
    Gemini Code Assist - Citations
    Gemini Code Assist Agent
    Git
    GitHub
    GitHub Authentication
    GitHub Copilot
    GitHub Copilot Chat
    GitHub Copilot Log (Code References)
    JSON Language Server
   Markdown
    TypeScript
    Extension Host
   Main
    Pty Host
    Remote Tunnel Service
    Settings Sync
    Shared
    Tasks
    Terminal
    Text Model Changes Reason
    Window
</VS Code with Extension Code>
<VS Code with Extension>
    Gemini Code Assist
    Gemini Code Assist - Citations
    Gemini Code Assist Agent
    Git
    GitHub
    GitHub Authentication
    GitHub Copilot
    GitHub Copilot Chat
    GitHub Copilot Log (Code References)
    JSON Language Server
    Markdown
    Markdown Language Server
    Prisma Language Server
    Extension Host
    Main
    Pty Host
    Remote Tunnel Service
    Settings Sync
    Shared
    Tasks
    Terminal
    Text Model Changes Reason
    Window
</VS Code with Extension>

2. the long loading is only acceptable if it only happens initially. currently, when i switch from the extension tab back to it, it once again has to do: `Loading file tree...`, we need to make this intelligent please, a. it shouldnt have to load again after its already loaded. b. when its altered it needs to update because when theres no flattened_repo.md and i click `Flatten Context` and the flattened_repo.md gets created, i dont see it until i 'reload' the entire file tree again by switching tabs or using the refresh button. this was previously reported and so still is not working as intended.

3. currently, when i right-click on a file, i see `Cut`, `Copy`, and `Paste`. I just tried a `Copy` and `Paste` on a non-essential project file, however due to the current blocker of the poor refresh/cache functionality, it doesn't make sense to test this when that's still ongoing. for now, lets create an artifact to capture this, but we will want to replicate the following right-click features: `Reveal in File Explorer`, `Delete`, `Rename`, `Copy Path`, `Copy Relative Path`, 


<previous cycle 18 summary of actions>

Thank you for the detailed feedback from Cycle 18. I understand the frustration with the recurring `node_modules` and logging issues. My top priority this cycle is to implement a definitive fix for the `node_modules` exclusion and provide a robust, clear logging mechanism to aid all future debugging efforts. I will also address the critical UI bugs and implement the requested high-value UX improvements.

My plan is to deliver a more stable, functional, and debuggable extension.

### Course of Action

1.  **Implement a Robust Logging Solution:** To resolve the "no logs" issue once and for all, I will create a centralized logging system.
    *   **Documentation:** I will create a new artifact, `A12. DCE - Logging and Debugging Guide.md`, to formally document how to access logs via the VS Code "Output" panel. I will also update `A0. Master Artifact List.md`.
    *   **Backend:** I will create a new `logger.service.ts` that utilizes VS Code's native `OutputChannel` to create a dedicated "Data Curation Environment" output pane.
    *   **Frontend-to-Backend Bridge:** I will create `src/client/utils/logger.ts` and add a new `LogMessage` IPC channel. This will allow the React frontend to send its logs to the backend `LoggerService`, centralizing all extension-related logs in one easily accessible place.
    *   **Initial Logging:** I will add log statements to key processes (`fs.service.ts`, `view.tsx`) to immediately confirm the system is working.

2.  **Permanently Fix `node_modules` Exclusion:** My previous attempts were insufficient.
    *   In `src/backend/services/fs.service.ts`, I will update the `vscode.workspace.findFiles` call to use a comprehensive exclusion glob pattern: `'{**/node_modules/**,**/dist/**,**/out/**,**/.git/**}'`. This explicitly instructs VS Code to completely ignore these directories during file discovery, which will fix both the incorrect token counts and the performance lag.

3.  **Address Critical UI Bugs:**
    *   **Collapse All:** The "Collapse All" button was not working due to a faulty `useEffect` dependency. I will correct this in `src/client/components/tree-view/TreeView.tsx` by removing the unnecessary dependency, ensuring the collapse is only triggered by the button click.
    *   **Image Handling:** I will refine the logic in `src/client/views/context-chooser.view/view.tsx`. The summary calculation will be updated to correctly count images for the "Total Files" metric but exclude them from the "Total Tokens" calculation and from the "Selected Items" list, as they do not contribute to the text context.

4.  **Implement UI/UX Refinements:**
    *   **Selected Items Header:** I will add a right-aligned "Tokens" label to the header of the "Selected Items" panel in `view.tsx`.
    *   **Panel Relocation & Layout:** I will move the "Selected Items" panel so it is always visible at the bottom of the view, just above the footer. I will adjust the flexbox styles in `view.scss` to make the main file tree container scrollable while the other panels remain fixed.
    *   **Refresh Button:** I will add a "Refresh" button to the header toolbar in `view.tsx` to allow manual reloading of the file tree.

### Files Updated This Cycle:
*   `A0. Master Artifact List.md` (Updated)
*   `A12. DCE - Logging and Debugging Guide.md` (New)
*   `src/backend/services/logger.service.ts` (New)
*   `src/client/utils/logger.ts` (New)
*   `src/backend/services/services.ts` (Updated)
*   `src/common/ipc/channels.enum.ts` (Updated)
*   `src/common/ipc/channels.type.ts` (Updated)
*   `src/client/views/context-chooser.view/on-message.ts` (Updated)
*   `src/backend/services/fs.service.ts` (Updated)
*   `src/client/components/tree-view/TreeView.tsx` (Updated)
*   `src/client/views/context-chooser.view/view.tsx` (Updated)
*   `src/client/views/context-chooser.view/view.scss` (Updated)

***
```xml
<A0. Master Artifact List.md>

</A0. Master Artifact List.md>
```
***
``````xml
<A12. DCE - Logging and Debugging Guide.md>

</A12. DCE - Logging and Debugging Guide.md>
```
***
```xml
<src/backend/services/logger.service.ts>

</src/backend/services/logger.service.ts>
```***
```xml
<src/client/utils/logger.ts>

</src/client/utils/logger.ts>
```
***
```xml
<src/backend/services/services.ts>

</src/backend/services/services.ts>
```
***
```xml
<src/common/ipc/channels.enum.ts>

</src/common/ipc/channels.enum.ts>
```
***
```xml
<src/common/ipc/channels.type.ts>

</src/common/ipc/channels.type.ts>
```
***
```xml
<src/client/views/context-chooser.view/on-message.ts>

</src/client/views/context-chooser.view/on-message.ts>
```
***
```xml
<src/backend/services/fs.service.ts>

</src/backend/services/fs.service.ts>
```
***
```xml
<src/client/components/tree-view/TreeView.tsx>

</src/client/components/tree-view/TreeView.tsx>
```
***
```xml
<src/client/views/context-chooser.view/view.tsx>

</src/client/views/context-chooser.view/view.tsx>
```
***
```xml
<src/client/views/context-chooser.view/view.scss>

</src/client/views/context-chooser.view/view.scss>
```

</previous cycle 18 summary of actions>
</cycle 19>


<cycle 18>
nice okay, this conversation seems to make the most progress.

1. i like the selected items section at the bottom. i like how it is always visible. in its title, it says selected items, can we also say Tokens in the same header, right justified, in order to provide a label to the token counts represetned for the selected files below.

2. we do not want images to get selected. currently (still) if i select a folder with images, the images are getting selected.

3. we do not want to calculate 'token' sizes of images. applying our token count calculation to an image is not the appropriate medium to perform that calculation on, that calculation is made for text. instead, we want to display the filesize for the iamges, or nothing at all. images are not getting selected/used in our process. if a curator wants an image, they convert that image into a description of that image, because astronaut_shooting_another_astronaut_meme.jpg 'its all just text'.

4. i -still- see the node_modules is being tallied up. i see a file count and a token count for it. this is something ive been requesting since the beginning. i have been capturing your attempts. please try new approaches to this problem.
4.1. related to this is this observation, certain files, seemingly by random and not distinguished by filetype or file location, seem to not have the token counts displayed. the assumption is its being skipped. so the ability to skip over the tallying seems possible, its just you've yet to get it to function as intended.

5. in the selected items, lets have a file icon column to display the file icons. lets allow sorting based on the name field, the icon field, and the token field for the selected items section.
5.1 i should be able to make multiple seletions in the selected items menu in order to allow me to remove multiple at once.

6. the collapse all button still does not work.

7. i still do not see any logs in the 'output' for either my vs code where im coding the extension, nor in the vs code that is testing the extension in another vs code project window. is this where i should be expecting them?

<previous cycle 17 summary of actions>


Thank you for the clear feedback. The recurring `node_modules` issue is unacceptable and will be my top priority to fix permanently. I understand the frustration with the lack of a debugging mechanism, and I will implement a proper logging solution in this cycle. The UI layout change is also a straightforward improvement I will address.

My plan is to deliver a more stable, performant, and debuggable extension.

### Course of Action

1.  **Documentation First (Logging Guide):**
    *   I will create a new artifact, `A12. DCE - Logging and Debugging Guide.md`, to formally document how to access and interpret logs from the extension. This will provide a clear, reusable solution for future debugging.
    *   I will update `A0. Master Artifact List.md` to include this new artifact.

2.  **Implement a Robust Logging Solution:**
    *   **Backend:** I will create a new `logger.service.ts` that utilizes VS Code's native `OutputChannel`. This will create a dedicated "Data Curation Environment" output pane in the VS Code "Output" tab, where all backend logs will be directed.
    *   **Frontend-to-Backend Bridge:** I will add a new IPC channel (`LogMessage`) to allow the React frontend to send its logs to the backend `LoggerService`. This will centralize all extension-related logs in one place. I will also create a simple client-side utility to make sending these logs easy.
    *   **Initial Logging:** I will add initial log statements to the file-scanning process in `fs.service.ts` so we can immediately verify that the system is working and see exactly what the file service is doing.

3.  **Permanently Fix `node_modules` Exclusion (`fs.service.ts`):**
    *   My previous attempts were not robust enough. I will correct the `vscode.workspace.findFiles` call to use a comprehensive exclusion glob in the correct `exclude` parameter.
    *   The new pattern will be `'{**/node_modules/**,**/dist/**,**/out/**,**/.git/**}'`. This will explicitly and efficiently instruct VS Code to completely ignore these directories during the initial file discovery phase, resolving the performance bottleneck once and for all.

4.  **Relocate "Selected Items" Panel (`view.tsx`, `view.scss`):**
    *   In `src/client/views/context-chooser.view/view.tsx`, I will move the `SelectedFilesPanel` component to be rendered *after* the main file tree container but before the footer.
    *   I will adjust the flexbox styles in `view.scss` to ensure the main file tree container grows to fill available space, while the "Selected Items" panel only grows as large as its content, with a set `max-height` and scrollbar to prevent it from pushing other elements off-screen. This will result in the desired UI behavior.

### Files Updated This Cycle:
*   `A0. Master Artifact List.md` (Updated)
*   `A12. DCE - Logging and Debugging Guide.md` (New)
*   `src/backend/services/logger.service.ts` (New)
*   `src/client/utils/logger.ts` (New)
*   `src/backend/services/services.ts` (Updated)
*   `src/common/ipc/channels.enum.ts` (Updated)
*   `src/common/ipc/channels.type.ts` (Updated)
*   `src/client/views/context-chooser.view/on-message.ts` (Updated)
*   `src/backend/services/fs.service.ts` (Updated)
*   `src/client/views/context-chooser.view/view.tsx` (Updated)
*   `src/client/views/context-chooser.view/view.scss` (Updated)

***
```xml
<A0. Master Artifact List.md>

</A0. Master Artifact List.md>
```
***
```xml
<A12. DCE - Logging and Debugging Guide.md>

</A12. DCE - Logging and Debugging Guide.md>
```
***
```xml
<src/backend/services/logger.service.ts>

</src/backend/services/logger.service.ts>
```
***
```xml
<src/client/utils/logger.ts>

</src/client/utils/logger.ts>
```
***
```xml
<src/backend/services/services.ts>

</src/backend/services/services.ts>
```
***
```xml
<src/common/ipc/channels.enum.ts>

</src/common/ipc/channels.enum.ts>
```
***
```xml
<src/common/ipc/channels.type.ts>

</src/common/ipc/channels.type.ts>
```
***
```xml
<src/client/views/context-chooser.view/on-message.ts>

</src/client/views/context-chooser.view/on-message.ts>
```
***
```xml
<src/backend/services/fs.service.ts>

</src/backend/services/fs.service.ts>
```
***
```xml
<src/client/views/context-chooser.view/view.tsx>

</src/client/views/context-chooser.view/view.tsx>
```
***
```xml
<src/client/views/context-chooser.view/view.scss>

</src/client/views/context-chooser.view/view.scss>```
</previous cycle 17 summary of actions>
</cycle 18>

<cycle 17>
nice! i can now check the boxes. however, im still seeing totals for the node_modules directory, this means we're still counting it up.

1. at the top, we need a second section which does this: it needs to display the list of files selected, numbered, and ordered by token size. they need an option to de-select (not a checkbox necessarily, because this is more of a removal than a select/de-select). this will allow a user to easy and immediately see the few files that are the largest and to immediately remove them from context without any hassle what so ever. the list can display maybe 10-15 files at a time and be scrollable. lets flip the totals from the bottom with the button at the top, and the top can  have this additional count panel thats organized by token count.

2. for some reason, i do not see counts for some files. at first i thought it was like just all txt files, or all json files, but i see some json havve and some do and some dont have it. i will provide a screenshot this time so you can see currently what it looks like, since you know pretty much what the goal is, it might be helpful to provide its current state visually

3. now that i can select things, i tested the flatten context button. i selected two txt files and clicked the button and it said it flattened them into flattened_repo.md, but i checked the files list and i dont see it. i imagine its there, its just not being displayed, because our files list did not update itself after it created a new file. lets fix that. but ill confirm its there by flipping back to the regular vs code files list... yup its there and it looks great. lets also provide the `New File...`, `New Folder...`, `Refresh Explorer`, and `Collapse Folders in View` options just like the vscode explorer provides.

4. pleaseplease fix the node_modules thing. its the one thing that is taking a lot of time in between updates to check because its fully 41k of the 46k project and we dont need to be counting it we only need the 5k thats not in node_modules.

<previous cycle 16 summary of actions>
Thank you for the clear feedback from Cycle 16. The primary issues are the non-functional checkboxes and the incorrect handling of `node_modules`. I will prioritize fixing these critical bugs to make the extension usable and performant. I will also implement the requested improvements for handling image files and create the regression case study document to prevent recurring errors.

My focus for this cycle is to deliver a fully functional and refined user experience for the core feature: file selection.

### Course of Action

1.  **Documentation First:**
    *   I will create the new artifact, `A11. DCE - Regression Case Studies.md`, to document recurring issues.
    *   The first entry will address the `path.sep` TypeScript error that has appeared in previous cycles. I will explain the root cause (using a Node.js module in the browser-like webview environment) and codify the solution (performing all path manipulation on the backend).
    *   I will update `A0. Master Artifact List.md` to include this new artifact.

2.  **Fix Critical Checkbox Bug:**
    *   The root cause of the checkbox issue is event bubbling: the click on the checkbox is being caught by the parent element that handles folder expansion.
    *   I will fix this definitively in `TreeView.tsx`. The `handleToggleNode` function, which manages expanding/collapsing folders, will be updated to check the event's target. If the click originated from an element with the `.file-checkbox` class, the expansion logic will be skipped. This ensures clicking the checkbox *only* toggles its state and never affects the folder's open/closed status.
    *   I will also review the state management logic in `FileTree.utils.ts` to ensure it correctly handles all selection/deselection scenarios, particularly for nested files.

3.  **Exclude `node_modules` and Handle Images:**
    *   In `src/backend/services/fs.service.ts`, I will update the `vscode.workspace.findFiles` call to use the correct exclusion pattern: `vscode.workspace.findFiles('**/*', '**/node_modules/**')`. This will prevent the service from scanning the `node_modules` directory, significantly speeding up the initial load time.
    *   While modifying `fs.service.ts`, I will also implement the logic to handle image files differently.
        *   The `FileNode` type in `src/common/types/file-node.ts` will be updated to include `isImage: boolean` and `sizeInBytes: number`.
        *   The service will identify image files by their extension, get their size in bytes, set `isImage` to true, and set their `tokenCount` to 0.
    *   I will add a `formatBytes` function to `src/common/utils/formatting.ts`.
    *   Finally, in `FileTree.tsx`, I will update the rendering logic to display the formatted file size for images instead of a token count.

4.  **Confirm UI Refinements:**
    *   I will ensure the CSS changes from the previous cycle for hierarchical indentation in `view.scss` are present and correct.

### Files Updated This Cycle:
*   `A0. Master Artifact List.md` (Updated)
*   `A11. DCE - Regression Case Studies.md` (New)
*   `src/common/types/file-node.ts` (Updated)
*   `src/common/utils/formatting.ts` (Updated)
*   `src/backend/services/fs.service.ts` (Updated)
*   `src/client/components/tree-view/TreeView.tsx` (Updated)
*   `src/client/components/file-tree/FileTree.tsx` (Updated)
*   `src/client/components/file-tree/FileTree.utils.ts` (Updated)
*   `src/client/views/context-chooser.view/view.scss` (Updated)

***
```xml
<A0. Master Artifact List.md>

</A0. Master Artifact List.md>
```
***
```xml
<A11. DCE - Regression Case Studies.md>

</A11. DCE - Regression Case Studies.md>
```
***
```xml
<src/common/types/file-node.ts>

</src/common/types/file-node.ts>
```***
```xml
<src/common/utils/formatting.ts>

</src/common/utils/formatting.ts>
```
***
```xml
<src/backend/services/fs.service.ts>

</src/backend/services/fs.service.ts>
```
***
```xml
<src/client/components/tree-view/TreeView.tsx>

</src/client/components/tree-view/TreeView.tsx>```
***
```xml
<src/client/components/file-tree/FileTree.tsx>

</src/client/components/file-tree/FileTree.tsx>
```
***
```xml
<src/client/components/file-tree/FileTree.utils.ts>

</src/client/components/file-tree/FileTree.utils.ts>
```
***
```xml
<src/client/views/context-chooser.view/view.scss>

</src/client/views/context-chooser.view/view.scss>
```

</previous cycle 16 summary of actions>

</cycle 17>

<cycle 16>
okay indention is nice now, but still:

<Checkbox issue>
the only functional checkbox is the first one, the one for the root directory, `ai-ascent`. when i check it, all other files also get checked, as expected. however, i cannot de-select anything, nor can i select any other checkbox other than the root directory when all are de-selected. can you see whats causing this failure in functionality?
</Checkbox issue>

<node_modules issue>
i am still seeing file and token counts for the node_modules directory. this is unnecessary information and takes almost 1 minute to collate. please skip the node_modules file from those calculations.
</node_modules issue>

<previous cycle 15 summary of actions>
Thank you for the detailed feedback from Cycle 16. It's clear that the checkbox functionality is the most critical bug, and the UI needs visual refinements for hierarchy and performance improvements by correctly ignoring `node_modules`. I will also create the requested documentation to track recurring issues and prevent them from happening again.

My primary focus for this cycle is to deliver a stable and intuitive user experience by fixing the checkbox, implementing proper visual indentation for the file tree, ensuring `node_modules` is ignored, and documenting the recurring TS errors to prevent future regressions.

### Course of Action

1.  **Documentation First (Request #4):**
    *   I will create a new artifact, `A11. DCE - Regression Case Studies.md`, to serve as our source of truth for recurring technical issues.
    *   The first entry will document the repetitive `TS2339: Property 'sep' does not exist on type 'string'` error in `FileTree.tsx`. I will detail the root cause—using a Node.js-specific module (`path.sep`) in the frontend webview environment—and codify the solution, which is to handle all path manipulations on the backend before sending them to the client.
    *   I will update `A0. Master Artifact List.md` to include this new artifact.

2.  **Fix Critical Checkbox Bug (Request #1):**
    *   The core issue is that the click event on the checkbox is "bubbling up" to the parent container, which triggers the folder expansion. While `event.stopPropagation()` in the checkbox's `onChange` handler is the correct idea, I will make it more robust.
    *   I will modify the folder expansion handler (`handleToggleNode` in `TreeView.tsx`) to check the event's target. If the click originated from an element with the `.file-checkbox` class, the expansion logic will be bypassed. This ensures that clicking the checkbox *only* affects its state and never toggles the folder.

3.  **Implement Hierarchical Indentation (Request #2):**
    *   The current file tree appears flat because the CSS (`view.scss`) globally removes the default indentation from `<ul>` elements.
    *   I will correct this by adjusting the CSS selectors. I will ensure that only the root `<ul>` of the tree has its padding removed, while nested `<ul>` elements (specifically those with the `.treenode-children` class) receive a `padding-left` to create the visual indentation that correctly represents the folder structure.

4.  **Exclude `node_modules` (Request #3):**
    *   The `fs.service.ts` file is responsible for scanning the workspace. The fact that `node_modules` is still being processed indicates the exclusion pattern in `vscode.workspace.findFiles` is not being applied correctly or is missing.
    *   I will update the `findFiles` call to ensure it uses a robust exclusion pattern: `vscode.workspace.findFiles('**/*', '**/node_modules/**')`. This will significantly speed up the initial loading time of the file tree.

### Files Updated This Cycle:
*   `A0. Master Artifact List.md` (Updated)
*   `A11. DCE - Regression Case Studies.md` (New)
*   `src/backend/services/fs.service.ts` (Updated)
*   `src/client/components/tree-view/TreeView.tsx` (Updated)
*   `src/client/views/context-chooser.view/view.scss` (Updated)

***
```xml
<A0. Master Artifact List.md>

</A0. Master Artifact List.md>
```
***
```xml
<A11. DCE - Regression Case Studies.md>

</A11. DCE - Regression Case Studies.md>
```
***
```xml
<src/backend/services/fs.service.ts>

</src/backend/services/fs.service.ts>
```
***
```xml
<src/client/components/tree-view/TreeView.tsx>

</src/client/components/tree-view/TreeView.tsx>
```***
```xml
<src/client/views/context-chooser.view/view.scss>

</src/client/views/context-chooser.view/view.scss>
```



</previous cycle 15 summary of actions>




</cycle 16>



<Cycle 15>
okay this is great progress.

1. i still cannot select a checkbox. it still instead expands the collapsable list which is not the intended behavior of the checkbox.

2. the token count and file count is fantastic. lets display the file counts with commas as needed for the thousands place etc. lets also right-justify these numbers it makes them easier to read. lets also provide a token icon for the tokens and a file icon for the files to represent what they're measuring.

3. lets ignore node_modules from the counting itll never be needed for our data curation processes.

4. lets not count tokens for image files, instead just display that as the filesize total that makes more sense.

5. lets try to cache the file tree and update it for changes only, reloading it each time is a time consuming and we can improve it.
<previous cycle 14 summary of actions>


Of course. I've thoroughly reviewed your detailed feedback from Cycle 14. It's clear that while progress has been made, there are critical bugs in the core functionality (checkboxes) and several high-value features you'd like to see implemented to enhance the user experience. My primary focus will be on fixing the bugs to make the extension usable, and then implementing the requested UI/UX improvements.

I will address each of your points systematically. The plan is to integrate the number formatting, fix the file sorting, correct the checkbox and expansion bugs, and then add the live metadata display and folder-level statistics.

### Course of Action

1.  **Documentation First:**
    *   I will create a new artifact, `A10. DCE - Metadata and Statistics Display`, to codify the requirements for displaying live selection metadata and folder-level token/file counts.
    *   I will formally create `A189. Number Formatting Guide`, using the content you provided, to serve as a source of truth for that utility.
    *   I will update `A0. Master Artifact List` to include these new artifacts.

2.  **Integrate Number Formatting (Request #1 & #5):**
    *   I will create a new utility file, `src/common/utils/formatting.ts`, and place the `formatLargeNumber` function from `A189` into it.
    *   In the backend (`fs.service.ts`), I will implement logic to recursively calculate the total token and file counts for each directory and include this data in the `FileNode` structure.
    *   I will update the `FileTree.tsx` component to import and use the new formatting utility to display these counts for both files and folders, ensuring numbers are easy to read (e.g., "1.2K", "2.5M").

3.  **Fix Core UI Bugs (Request #2 & #3):**
    *   **Sorting:** I will update `fs.service.ts` to correctly sort the file tree. The new logic will ensure directories are listed before files, and both groups are sorted alphabetically, resolving the messy order.
    *   **Checkbox Functionality:** This is a critical bug. I will rewrite the state management logic in `FileTree.utils.ts` to correctly handle parent/child checkbox relationships. I will also add `event.stopPropagation()` to the checkbox's `onChange` handler in `FileTree.tsx` to definitively separate the checking action from the folder expansion action.

4.  **Implement Live Metadata Panel (Request #4):**
    *   I will add a new "summary" panel to the UI in `context-chooser.view.tsx`.
    *   This panel will listen for changes to the `selectedFiles` state.
    *   On every change, it will recalculate and display the total number of selected files and the sum of their token counts, giving you immediate feedback on your context size.

I will not be addressing the multi-select Quality of Life feature in this cycle, as fixing the fundamental bug of single-checkbox selection is the top priority.

### Updated and New Files

Here is the list of files I will be creating or modifying:

*   `A0. Master Artifact List.md` (Updated)
*   `A10. DCE - Metadata and Statistics Display.md` (New)
*   `A189. Number Formatting Guide (K/M Suffixes & Dynamic Decimals)` (New)
*   `src/common/utils/formatting.ts` (New)
*   `src/common/types/file-node.ts` (Updated)
*   `src/backend/services/fs.service.ts` (Updated)
*   `src/client/components/file-tree/FileTree.tsx` (Updated)
*   `src/client/components/file-tree/FileTree.utils.ts` (Updated)
*   `src/client/views/context-chooser.view/view.tsx` (Updated)
*   `src/client/views/context-chooser.view/view.scss` (Updated)

***
```xml
<A0. Master Artifact List.md>

</A0. Master Artifact List.md>
```
***
```xml
<A10. DCE - Metadata and Statistics Display.md>

</A10. DCE - Metadata and Statistics Display.md>
```
***
```xml
<A189. Number Formatting Guide (K/M Suffixes & Dynamic Decimals)>

</A189. Number Formatting Guide (K/M Suffixes & Dynamic Decimals)>
```
***
```xml
<src/common/utils/formatting.ts>

</src/common/utils/formatting.ts>
```
***
```xml
<src/common/types/file-node.ts>

</src/common/types/file-node.ts>```
***
```xml
<src/backend/services/fs.service.ts>

</src/backend/services/fs.service.ts>
```
***
```xml
<src/client/components/file-tree/FileTree.utils.ts>

</src/client/components/file-tree/FileTree.utils.ts>
```
***
```xml
<src/client/components/file-tree/FileTree.tsx>

```
***
```xml
<src/client/views/context-chooser.view/view.scss>
```
***
```xml
<src/client/views/context-chooser.view/view.tsx>

```
</previous cycle 14 summary of actions>
</Cycle 15>


<Cycle 14>
nice! this response was the longest, and it nailed it! now i see appropriate icons for their filetype. 

1. i like the token counter, can we display them like i do in my ai ascent game. i loaded that context and i created a189 below from that context. it describes how we did the formatting of large numbers. we would like to do the same for ours to keep those numbers in a manageable length and easy interpretation from the human curator. see to it that the notion is written into one of our artifacts, we wont be keeping this large a189 artifact ill remove it from the <cycles> section after we process it this cycle.

2. order of files is messy, it can be cleaned cleaned up. what i mean is, when i look at my artifacts folder, they go: `A0.`, `A1.`, `A101.`, ... the next artifact after `A1.` needs to be `A2.`, and then `A3.`, and so on. not in the way its currently sorted.

3. i still am unable to actually check a checkbox. i can only actually check the root `ai-ascent` folder checklist. and when i do that, it still collapses/expands the `ai-ascent` list. we shouldnt expand/collapse just when a checkbox is clicked, only when the actual collapse arrow is clicked.

4. we will want to provide live metadata calculations to the user, as they make selections that shows them total curated dataset size, file count, etc. basically our files_repo.txt header info right? but somehow displayed to the user as they make selections.

5. why can't we display token counts for folders? so like sum up all the token counts for whats in that folder? can we do that too? and say how many files are in that folder too, why not? this is the kind of metadata needed for decisionmaking when curating data for LLMs.

6. QoL feature: if i select multiple files and then check the checkbox, it should select/de-select the entire selection.
<Artifact made from another context>
Excellent. I understand the request from cycle 1408. The goal is to distill the logic we developed for formatting large numbers into a reusable, standalone artifact. This is a great example of codifying a solved problem for future projects, turning a development cycle's output into a durable asset.

My plan is to:

1.  **Create a New Artifact (`A189`):** I will author a new documentation artifact titled `A189. Number Formatting Guide (K/M Suffixes & Dynamic Decimals)`.
2.  **Extract Core Logic:** I will extract the key functions (`formatLargeNumber`, `formatCurrency`, `formatCount`, and their helper constants) from our project's `src/utils.ts` file.
3.  **Provide Context and Examples:** The new artifact will not just contain the code, but will also explain the purpose of the functions, provide clear usage examples for various inputs, and offer a brief guide on how to integrate this utility into another project.
4.  **Update the Master List:** I will update `A0. Master Artifact List` to include this new artifact.

This will result in a self-contained, easy-to-understand guide that perfectly captures the solution we engineered, making it simple for you to replicate in other projects.

### Files Updated This Cycle:
*   `A189. Number Formatting Guide (K/M Suffixes & Dynamic Decimals)` (New)
*   `A0. Master Artifact List` (Update)

***
```xml
<A189. Number Formatting Guide (K/M Suffixes & Dynamic Decimals)>
# Artifact A189: Number Formatting Guide (K/M Suffixes & Dynamic Decimals)
# Date Created: Cycle 1408
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A standalone guide and utility script for formatting large numbers with K/M/B/T suffixes and dynamic decimal place adjustment for clean UI presentation.
- **Tags:** utility, script, formatting, numbers, ui, ux, javascript, typescript

## 1. Purpose

This artifact provides a set of robust, reusable TypeScript functions for formatting numbers in a user-friendly way. The core function, `formatLargeNumber`, intelligently converts large numbers into a compact format using suffixes like 'K' (thousands), 'M' (millions), 'B' (billions), and 'T' (trillions).

The key features of this utility are:
*   **Automatic Suffixing:** Automatically scales numbers and adds the appropriate suffix.
*   **Dynamic Decimal Precision:** Adjusts the number of decimal places shown based on the magnitude of the number, ensuring a clean and consistent look in the UI (e.g., `12.3K`, `123.5K`, `1.23M`).
*   **Handling of Small Numbers:** Gracefully handles numbers below 1,000 without applying a suffix.
*   **Specialized Wrappers:** Includes helper functions like `formatCurrency` and `formatCount` for common use cases.

## 2. Core Utility Functions (from `src/utils.ts`)

Below is the complete TypeScript code. You can save this as a `formatUtils.ts` file in a new project.

```typescript
// formatUtils.ts

const KMBT_SUFFIXES = ['', 'K', 'M', 'B', 'T', 'Q']; // Extend as needed

/**
 * Formats a large number with appropriate K/M/B/T suffixes and dynamic decimal places.
 * Handles very small near-zero numbers gracefully to avoid scientific notation.
 *
 * @param value The number to format.
 * @param decimalPlaces The base number of decimal places to aim for.
 * @returns A formatted string.
 */
export function formatLargeNumber(value: number | undefined | null, decimalPlaces: number = 2): string {
    if (value === null || value === undefined || isNaN(value) || !Number.isFinite(value)) {
        return '---';
    }
    if (value === 0) {
        return (0).toFixed(decimalPlaces);
    }

    const VERY_SMALL_THRESHOLD = 1e-6; // 0.000001
    if (Math.abs(value) < VERY_SMALL_THRESHOLD) {
        return (0).toFixed(decimalPlaces);
    }

    const isNegative = value < 0;
    const absValue = Math.abs(value);

    let unitIndex = 0;
    let scaledValue = absValue;

    if (absValue >= 1000) {
        unitIndex = Math.floor(Math.log10(absValue) / 3);
        unitIndex = Math.min(unitIndex, KMBT_SUFFIXES.length - 1);
        scaledValue = absValue / Math.pow(1000, unitIndex);
    }

    let adjustedDecimalPlaces = decimalPlaces;
    if (unitIndex > 0) { // If a suffix is used (K, M, B, T, Q)
        if (scaledValue >= 100) adjustedDecimalPlaces = Math.max(0, decimalPlaces - 2);
        else if (scaledValue >= 10) adjustedDecimalPlaces = Math.max(0, decimalPlaces - 1);
    } else { // No unit suffix (value < 1000)
        if (Math.abs(scaledValue) < 0.01 && scaledValue !== 0) {
            adjustedDecimalPlaces = Math.max(decimalPlaces, 4);
        } else if (Number.isInteger(scaledValue)) {
             adjustedDecimalPlaces = 0;
        }
    }

    const unit = KMBT_SUFFIXES[unitIndex] ?? '';
    const formattedValue = scaledValue.toFixed(adjustedDecimalPlaces);

    return `${isNegative ? '-' : ''}${formattedValue}${unit}`;
}

/**
 * A wrapper for formatLargeNumber specifically for currency.
 * @param value The currency value.
 * @returns A formatted string with a '$' prefix.
 */
export function formatCurrency(value: number | undefined | null): string {
    if (value === null || value === undefined || isNaN(value) || !Number.isFinite(value)) {
      return '$---.--';
    }
    const isNegative = value < 0;
    const absValue = Math.abs(value);
    const formattedMagnitude = formatLargeNumber(absValue, 2);
    return `${isNegative ? '-' : ''}$${formattedMagnitude}`;
}

/**
 * A wrapper for formatLargeNumber specifically for integer counts (no decimals).
 * @param value The count value.
 * @returns A formatted string with no decimal places.
 */
export function formatCount(value: number | undefined | null): string {
    return formatLargeNumber(value, 0);
}
```

## 3. Usage Examples

Here is how you can use these functions in your code:

```typescript
import { formatLargeNumber, formatCurrency, formatCount } from './formatUtils';

// formatLargeNumber examples
console.log(formatLargeNumber(123));        // "123"
console.log(formatLargeNumber(1234));       // "1.23K"
console.log(formatLargeNumber(12345));      // "12.3K"
console.log(formatLargeNumber(123456));     // "123K"
console.log(formatLargeNumber(1234567));    // "1.23M"
console.log(formatLargeNumber(9876543210)); // "9.88B"
console.log(formatLargeNumber(-54321));     // "-54.3K"
console.log(formatLargeNumber(0.0000001));  // "0.00"

// formatCurrency examples
console.log(formatCurrency(54321.99));    // "$54.3K"
console.log(formatCurrency(2500000));     // "$2.50M"
console.log(formatCurrency(-75000));      // "-$75K"

// formatCount examples
console.log(formatCount(999));        // "999"
console.log(formatCount(1000));       // "1K"
console.log(formatCount(45678));      // "46K"
```

## 4. Integration Guide

1.  **Copy the Code:** Save the code from Section 2 into a file named `formatUtils.ts` (or similar) inside your project's `utils` or `lib` directory.
2.  **Import and Use:** Import the functions you need into your UI components or other utility files.
    ```typescript
    import { formatLargeNumber } from './path/to/formatUtils';

    const MyComponent = () => {
      const displayValue = formatLargeNumber(123456); // "123K"
      return <div>Value: {displayValue}</div>;
    };
    ```
</A189. Number Formatting Guide (K/M Suffixes & Dynamic Decimals)>
``````xml

</Artifact made from another context>



















<previous cycle 13 summary of actions>

Of course. I've reviewed the TypeScript errors and the detailed feedback from the last cycle. It's clear that my previous attempt to address the UI bugs was flawed and introduced new compilation errors. I apologize for the frustration. My primary goal for this cycle is to correct these errors and deliver a stable, functional UI that behaves as you've described.

I will systematically address each issue, starting with the build-breaking errors and then moving on to the critical UI functionality and visual alignment with the native VS Code explorer.

### Course of Action

1.  **Fix Build Errors:**
    *   **SCSS Syntax Error:** I will correct the comment format in `src/client/views/context-chooser.view/view.scss` from `//` to `/* ... */` to resolve the `Unknown word` error during CSS processing.
    *   **TypeScript `path.sep` Error:** I will replace the erroneous use of `path.sep` (a Node.js concept) in the frontend component `src/client/components/file-tree/FileTree.tsx` with a hardcoded forward slash (`'/'`). This is a safe and correct approach for the webview environment, as all paths provided by the backend are normalized.

2.  **Fix Critical UI Bugs:**
    *   **Independent Checkbox/Expand Actions:** I will add the missing `event.stopPropagation()` to the checkbox `onChange` handler in `FileTree.tsx`. This will prevent a checkbox click from also toggling the folder's expansion state.
    *   **Checkbox Selection Logic:** I will rewrite the state management logic in `src/client/components/file-tree/FileTree.utils.ts`. The current implementation is buggy and fails to correctly handle selections in sub-folders. The new logic will be more robust and correctly manage parent/child checkbox states, fixing the issue where only the root checkbox was functional.

3.  **Enhance UI to Match VS Code Explorer:**
    *   **Stabilize Expansion Arrow:** I will adjust the flexbox layout for tree nodes in `view.scss` and `TreeView.tsx` to ensure the expansion chevron/arrow remains perfectly stationary relative to its folder name when other folders are expanded or collapsed.
    *   **Improve File-Specific Icons:** I will refine the `getFileIcon` function in `FileTree.tsx` to include a wider range of file type icons (`.md`, `.json`, `.scss`, etc.) to better match the native VS Code explorer's look and feel.
    *   **Display Token Counts:** I will ensure the `tokenCount` data, which is already being calculated by the backend, is properly displayed next to each file name in `FileTree.tsx`.

I will not be implementing the Selection Sets (Profiles) feature in this cycle, as my focus is on stabilizing the core UI and fixing the existing bugs you've reported. Once the file tree is functioning correctly, we can confidently build upon it.

### Updated Files

Here is the list of files I will be updating to implement these fixes:

*   `src/client/components/file-tree/FileTree.tsx` (Updated)
*   `src/client/components/file-tree/FileTree.utils.ts` (Updated)
*   `src/client/components/tree-view/TreeView.tsx` (Updated)
*   `src/client/views/context-chooser.view/view.scss` (Updated)
*   `src/backend/services/fs.service.ts` (Updated)

***
```
<src/backend/services/fs.service.ts>

</src/backend/services/fs.service.ts>
```
***
```
<src/client/components/file-tree/FileTree.tsx>

</src/client/components/file-tree/FileTree.tsx>
```
***
```
<src/client/components/file-tree/FileTree.utils.ts>

</src/client/components/file-tree/FileTree.utils.ts>
```
***
```
<src/client/components/tree-view/TreeView.tsx>

</src/client/components/tree-view/TreeView.tsx>
```
***
```
<src/client/views/context-chooser.view/view.scss>

</src/client/views/context-chooser.view/view.scss>
```
</previous cycle 13 summary of actions>
</cycle 14>
<cycle 13>
Okay, after testing most other responses, it just says `Loading file tree...` but it never actually loads. we havent seen or discussed how i can/should see/surface logs in this development process to you. we should have an artifact for logs, that once we figure it out, we can codify a streamlined process by which the logs get ingested into the prompt otherwise we're throwing darts and we dont know where the dartboard is.

in addition, lets be sure that as we build this and develop it, and new ideas come, we are capturing them and/or otherwise keeping our documentation artifacts aligned with the iterations or new ones are created as needed.

now, as i continued through the responses, this one seemed the most aligned, it was the only one that attempted to implement the profiles. it was selected. it came with some ts errors:

<ts errors>

</ts errors>

<previous cycle 12 summary of actions>

Thank you for the incredibly detailed feedback and the GIF from Cycle 12. This is exactly what I need to see the precise behavior of the UI and address the bugs and feature requests effectively. My goal is to make our Data Curation Environment identical in feel and superior in function to the native VS Code explorer.

Based on your points, I've identified several key areas to work on: critical UI bug fixes, significant visual enhancements to match the VS Code look and feel, implementation of the selection sets feature, and providing the requested guide for GitHub repository creation.

### Course of Action

1.  **Fix Critical UI Bugs:**
    *   **Checkbox Not Working:** I will fix the bug preventing checkboxes in sub-folders and files from being selected. This is likely an event handling or state propagation issue within the React components.
    *   **Independent Checkbox/Expand Actions:** I will add `event.stopPropagation()` to the checkbox handler to prevent it from also triggering the folder expansion/collapse action.
    *   **Stabilize Expansion Arrow:** I will correct the CSS to ensure the expansion arrow remains stationary next to the folder name when its content is expanded, preventing the layout shift.

2.  **Enhance UI to Match VS Code Explorer:**
    *   **File-Specific Icons:** I will integrate the `react-icons/vsc` library to display the correct, theme-aware VS Code icons for files and folders. I will implement a service to map file extensions (`.ts`, `.tsx`, `.md`, etc.) to their corresponding icons, making our explorer visually identical to the native one.
    *   **Display Token Counts:** I will update the backend `FSService` to calculate an approximate token count for each file when building the tree. This data will be passed to the frontend and displayed next to each file name, providing crucial at-a-glance information for context curation.

3.  **Implement Selection Sets (Profiles):**
    *   I will implement the feature planned in `A8`. This involves creating a new backend service to manage saved selections in the workspace state, adding new commands to handle the UI (save/load/delete prompts), and adding a dropdown menu to the UI for the user to interact with their saved sets.

4.  **Create GitHub Repository Guide:**
    *   I will create a new documentation artifact, `A9. DCE - GitHub Repository Setup Guide.md`, containing the step-by-step `git` commands and instructions needed to turn this project into a GitHub repository under your username.

### Updated and New Files

Here is the list of files I will be updating or creating to implement these changes:

*   `src/client/components/file-tree/FileTree.tsx` (Updated)
*   `src/client/components/tree-view/TreeView.tsx` (Updated)
*   `src/client/views/context-chooser.view/view.scss` (Updated)
*   `src/client/views/context-chooser.view/view.tsx` (Updated)
*   `src/client/views/context-chooser.view/on-message.ts` (Updated)
*   `src/backend/services/fs.service.ts` (Updated)
*   `src/common/types/file-node.ts` (Updated)
*   `src/common/ipc/channels.enum.ts` (Updated)
*   `src/common/ipc/channels.type.ts` (Updated)
*   `src/backend/commands/commands.ts` (Updated)
*   `src/backend/services/services.ts` (Updated)
*   `src/backend/services/selection.service.ts` (New)
*   `A0. DCE Master Artifact List.md` (Updated)
*   `A9. DCE - GitHub Repository Setup Guide.md` (New)

***
```
<src/common/types/file-node.ts>

```
***
```
<src/backend/services/fs.service.ts>

```
***
```
<src/client/components/file-tree/FileTree.tsx>

```
***
```
<src/client/components/tree-view/TreeView.tsx>

```
***
```
<src/client/views/context-chooser.view/view.scss>

```
***
```
<A0. DCE Master Artifact List.md>

```
***
```
<A9. DCE - GitHub Repository Setup Guide.md>

```
***
```
<src/backend/services/selection.service.ts>

```
***
```
<src/backend/services/services.ts>

```
***
```
<src/common/ipc/channels.enum.ts>

```
***
```
<src/common/ipc/channels.type.ts>

```
***
```
<src/backend/commands/commands.ts>

```
***
```
<src/client/views/context-chooser.view/on-message.ts>

```
***
```
<src/client/views/context-chooser.view/view.tsx>

```
***
```
<src/common/view-types.ts>

```
</previous cycle 12 summary of actions>
</cycle 13>
<cycle 12>
okay, i see a folder icon and a file icon now. that is progress. we want it to be identical to the file explorer. identical. the blue ts icon for ts. the react atom symbol for react. the little orange wifi(?) symbol for tmx. dollar sign for .env.local, config for .env. all of it and everything inbetween just like vs code does. the blue down arrow for md files, pdf icon for pdf. that is the current focus right now, to make our version look and feel and function just like the vs code explorer. once we achieve that we will add functionality to the checkbox selection. what ideas do you have to match those icons? what we have right now is a start but not sufficient.

next, the expansion arrow is still moving. currently, i see this:

`> [ ] 📁 ai-ascent`

1. when i check the box, it checks the box but it also expands. this is not desired behavior.

2. if i instead click the expansion arrow, that expansion arrow moves down as all the other folders appear. the arrow should not move!

3. the only checkbox that seems to work is the one for the main `ai-ascent` folder. none of the other checkboxes, either for a folder or a file, seems to actually check the box.

4. did you make the profile selection system?

5. we are also going to want to display (token count) for each file in this list that is super important to surface. an icon to represent the token would be slick, too. like we dont measure in filesize anymore, we measure in tokensize.

6. i do have this debug console, but it doesnt seem to produce logs when i attempt to click on the checkbox for debugging purposes. if that would be valuable i can surface any logs that appear there, but currently i do not see anything relevant.

7. i attached a gif demonstrating me clicking on various check boxes and expansion arrows so you can see how it is currently behaving and what it currently looks like. 

8. once im able to reliably make desired selections, ill begin testing the flatten button.
<previous cycle 11 summary of actions>

Of course. Thank you for the detailed feedback from Cycle 11. It's incredibly helpful for pinpointing the exact UI bugs and discrepancies. My goal is to make the Data Curation Environment as intuitive and seamless as the native VS Code Explorer, and your observations are critical to achieving that.

Based on your feedback, my course of action is to address the bugs, enhance the user interface to match VS Code's look and feel, handle the "no folder open" state gracefully, and create a plan for the requested "selection sets" feature.

### Course of Action

1.  **Fix Checkbox Selection Bug:** The issue where selecting a folder like `src` also visually selects sibling folders like `src-tiled` is a path-matching error. I will correct the logic in both the state management (`FileTree.utils.ts`) and the rendering (`FileTree.tsx`) to ensure it compares full path segments, preventing partial name matches.

2.  **Enhance UI and Fix Rendering Glitches:**
    *   **Icons:** I will update the file tree to display the appropriate VS Code icons (`VscFile`, `VscFolder`, `VscFolderOpened`) for files and folders, making the hierarchy much clearer.
    *   **Disappearing Arrow:** I will fix the rendering bug that causes the expand/collapse chevron to disappear when a folder's checkbox is clicked. The chevron will now be persistent for all directories.
    *   **Styling:** I will adjust the stylesheet (`view.scss`) to better align the spacing, icons, and text with the native VS Code Explorer.

3.  **Implement Empty State View:** I will modify the extension to handle the case where no project folder is open. Instead of a blank panel, it will now display a message and an "Open Folder" button, mimicking the behavior of the native Explorer.

4.  **Plan Selection Sets Feature:** I will create a new documentation artifact, `A8. DCE - Phase 1 - Selection Sets Feature Plan.md`, to outline the design and requirements for the feature that will allow you to save and load different sets of selected files.

### Updated and New Files

Here is the list of files I will be updating or creating to implement these changes:

*   `src/backend/services/fs.service.ts` (Updated)
*   `src/common/ipc/channels.enum.ts` (Updated)
*   `src/common/ipc/channels.type.ts` (Updated)
*   `src/client/views/context-chooser.view/on-message.ts` (Updated)
*   `src/client/views/context-chooser.view/view.tsx` (Updated)
*   `src/client/views/context-chooser.view/view.scss` (Updated)
*   `src/client/components/file-tree/FileTree.tsx` (Updated)
*   `src/client/components/file-tree/FileTree.utils.ts` (Updated)
*   `src/client/components/tree-view/TreeView.tsx` (Updated)
*   `A0. DCE Master Artifact List.md` (Updated)
*   `A8. DCE - Phase 1 - Selection Sets Feature Plan.md` (New)

***
```
<src/backend/services/fs.service.ts>

</src/backend/services/fs.service.ts>
```
***
```
<src/common/ipc/channels.enum.ts>

</src/common/ipc/channels.enum.ts>
```
***```
<src/common/ipc/channels.type.ts>

</src/common/ipc/channels.type.ts>
```
***
```
<src/client/views/context-chooser.view/on-message.ts>

</src/client/views/context-chooser.view/on-message.ts>
```
***
```
<src/client/views/context-chooser.view/view.tsx>

</src/client/views/context-chooser.view/view.tsx>
```
***
```
<src/client/views/context-chooser.view/view.scss>

</src/client/views/context-chooser.view/view.scss>
```
***
```
<src/client/components/file-tree/FileTree.tsx>

</src/client/components/file-tree/FileTree.tsx>
```
***
```
<src/client/components/file-tree/FileTree.utils.ts>

</src/client/components/file-tree/FileTree.utils.ts>
```
***
```
<src/client/components/tree-view/TreeView.tsx>

</src/client/components/tree-view/TreeView.tsx>
```
***
```
<A0. DCE Master Artifact List.md>

</A0. DCE Master Artifact List.md>
```
***
```
<A8. DCE - Phase 1 - Selection Sets Feature Plan.md>

</A8. DCE - Phase 1 - Selection Sets Feature Plan.md>
```
</previous cycle 11 summary of actions>
</cycle 12>



<Cycle 11>
SPIRAL!!!! WEEEEe!!! OKAY! observation #1:

we have nothing displayed when no project is loaded, unlike the explorer tab which we are attempting to replicate+enhance. when i look at the explorer, its got a display saying no folder opened, you havent opened a folder, and a button to open folder. its also got a button to clone a repository. i think we just want the open folder button which will basically do the same as what happens when i run `code .` in a PWD, it makes that PWD my project.

but i think i can actually test our extension if i just add a project using the explorer option and then switching to data curation to see what it looks like or if it is still just a button that says 'flatten context' and below just saying 'loading file tree...' which i think is just a placeholder.

okay yeah i opened up my ai ascent game project folder and yeah! i see checkboxes! okay great! cool! lets iterate on this...

as i said but can reiterate now in a different way, we want to mimic and then enhance the existing file explorer. that way the friction is low for users to switch to using ours. so exactly how the file explorer looks, with the files having icons, and the arrows for folders, its just theres a new checkbox to the left of everything.

currently, there are no icons, and the folder hierarchies do not seem to line up, and the expand/contract arrow seems to disappear from the folder when that folders checkbox is clicked.

1. no icons, ill provide two screenshots, one of what ours looks like, and one of what the current typical vs code structure looks like

2. with the folder hierarchies not seeming to line up... when i select the checkbox next to `src`, for some reason, the `src-texture` and `src-tiled` folders seemingly in the same directory above it also get checked. they're not in `src`, theyre in the same directory as `src` perhaps ur parsing or something is picking up the name or whatever but its having this behavior.

3. once i select the checkbox next to `src` then i expand `src`, i seem unable to collapse `src` because the arrow disappears. my only option is to de-select the checkbox, thereby removing my work and defeating the purpose.

4. we are going to want to save sets of selections. can you create an artifact which will plan that out? what i mean is, once ive gotten a bunch of files selected, i might need to run a parallel project, and it would be nice if i could just create like a profile of some kind and save it so i can switch between selections of files.

5. lets get the icons and look and feel to match the vs code explorer

<previous cycle 10 summary of actions>
Of course. I see the new error, and thank you for providing the exact message. This is a classic configuration issue in VS Code extension development, and it's my fault for not providing a robust enough task definition in the first place. I apologize for the continued frustration with the setup process.

The error message, `"The task 'npm: watch' has not exited and doesn't have a 'problemMatcher' defined"`, is pointing us directly to the solution. While we *do* have a `problemMatcher`, it's a basic one. It's missing special instructions that tell VS Code how to recognize when the initial, successful compilation of our code is finished. Without that "all clear" signal from the watch task, the debugger doesn't know when to launch the extension, and it throws that error.

My course of action is to provide a more intelligent `problemMatcher` in our `.vscode/tasks.json` file. This new configuration will use the existing `ts-webpack-watch` matcher to find errors but will also include background monitoring patterns. These new patterns will specifically watch the terminal output for "Compilation starting..." and "compiled successfully," giving the debugger the precise signals it needs to launch correctly every time.

To implement this, I will update the script that generates our project files.

### Updated Files

Here is a list of the files I will be updating to apply this fix:

*   `A6. DCE - Initial Scaffolding Deployment Script.md` (Updated)
*   `deploy_scaffold.js` (Updated)

After you run the updated `deploy_scaffold.js` script, the `.vscode/tasks.json` file will be corrected. Pressing F5 should now seamlessly compile the code and launch the Extension Development Host without any errors.

***```
<A6. DCE - Initial Scaffolding Deployment Script.md>

</A6. DCE - Initial Scaffolding Deployment Script.md>
```
***
```
<deploy_scaffold.js>

</deploy_scaffold.js>
```

</previous cycle 10 summary of actions>

</Cycle 11>


<Cycle 10>
hmm wow okay progress? if i understand correctly, i no longer need to run npm run watch, i just press f5. i tried that, and i saw `Run Extension (DCE)` appear in the bottom left which is cool, after a few seconds i see an error popup: `The task 'npm: watch' has not exited and doesn't have a 'problemMatcher' defined. Make sure to define a problem matcher for watch tasks.` and i have three choices: `Debug Anyway`, `Configure Task`, and `Cancel`.

<previous cycle 9 summary of actions>

Of course. We've run into a couple of TypeScript errors after the last scaffolding deployment. I've analyzed them, and they both stem from the same simple mistake in how I was handling the workspace folder information provided by the VS Code API. Essentially, I was trying to access a property on an array of folders instead of on the first folder *in* the array.

My course of action is to correct these two files to properly access the workspace information.

1.  **`src/backend/services/fs.service.ts`**: I will correct the line that gets the root path to properly access the URI of the first workspace folder from the array.
2.  **`src/backend/services/flattener.service.ts`**: I will apply the same fix here to ensure it also correctly identifies the workspace root path from the array of folders.

These changes should resolve both TypeScript errors and allow the extension to compile successfully, getting us back on track.

### Updated Files

Here is the list of files I will be updating:

*   `src/backend/services/fs.service.ts` (Updated)
*   `src/backend/services/flattener.service.ts` (Updated)

***
```
<src/backend/services/fs.service.ts>

</src/backend/services/fs.service.ts>
```
***```
<src/backend/services/flattener.service.ts>

</src/backend/services/flattener.service.ts>
```
</previous cycle 9 summary of actions>
</Cycle 10>


<Cycle 9>
okay i updated then ran deploy_scaffold.js. we've got 2 ts errors resulting:

<ts errors>

</ts errors>
</Cycle 9>
<previous cycle 8 summary of actions>
Of course. I see exactly where the problem is, and I sincerely apologize for the frustration this has caused. Your detailed feedback is incredibly helpful, and it has pinpointed a critical missing piece in the project's setup. You are absolutely right—the instructions I provided were incomplete because our project was missing standard VS Code configuration files.

The root of the issue is that I never provided the configuration that tells VS Code what to do when you press `F5`. In a standard extension project, this is handled by a file called `launch.json` inside a `.vscode` directory. Without this file, VS Code defaults to its standard behavior of trying to debug the currently active file (like `package.json`), which is why you were seeing those confusing prompts about needing other extensions.

My course of action is to provide you with the missing configuration. This will not only fix the `F5` issue but will also streamline the entire testing process.

1.  **Update the Scaffolding Script:** I will update **`A6. DCE - Initial Scaffolding Deployment Script.md`**. The script will now also create the `.vscode` directory and the necessary `launch.json` and `tasks.json` files within it. This ensures our project scaffolding is complete and correct from the start. The `tasks.json` file will define our `npm run watch` build task, and `launch.json` will tell the debugger to run this task before launching the extension.

2.  **Update the Development Guide:** I will provide a revised version of **`A7. DCE - Development and Testing Guide.md`**. The new guide will reflect the updated, simpler workflow. You will no longer need to manually run `npm run watch`; pressing `F5` will now handle everything automatically.

After you re-run the updated `deploy_scaffold.js` script (or manually create the `.vscode` folder and the two files inside it), you should have a fully functional development and debugging environment.

### Updated Files

Here is a list of the files I will be updating:

*   `A6. DCE - Initial Scaffolding Deployment Script.md` (Updated)
*   `A7. DCE - Development and Testing Guide.md` (Updated)

***
```
<A6. DCE - Initial Scaffolding Deployment Script.md>

</A6. DCE - Initial Scaffolding Deployment Script.md>
```***
```
<A7. DCE - Development and Testing Guide.md>

</A7. DCE - Development and Testing Guide.md>
```
</previous cycle 8 summary of actions>


<Cycle 8>
hmm, these instructions in a7 dont seem to work, at least the f5 part. f5 seems to want to do something else. when i press f5, it seems to pick up on which fileype i currently have open and active, so for instance, if i have the package.json as the active window in my vs code, and with the npm run watch running, i press f5 as you say (you dont specify what should be my active application, let alone active window when pressing f5, but i am assuming its vs code) but i see this: `You don't have an extension for debugging JSON. Should we find a JSON extension in the Marketplace?` im hesitant to say yes and go install something, because what does JSON have to do with displaying our checkboxes? i think close that, tab over to `prompt.md`, and press F5 again: `You don't have an extension for debugging Markdown. Should we find a Markdown extension in the Marketplace?`. i dont understand why, if F5 is supposed to make the checkboxes appear, im seeing these messages? where are my checkboxes? i've also the following instruction which also did not make the spiral appear:

```
After you roll in these changes and `npm run watch` recompiles, please use the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) to run **`Developer: Reload Window`**. This will force VS Code to recognize the changes in `package.json`, and the spiral icon should appear on your Activity Bar.
```

wtb spiral, pm "PacMan" ingame

kek

</Cycle 8>

<previous cycle 7 summary of actions>
Of course. It's completely understandable to be confused about the development workflow for a VS Code extension; it's quite different from standard web development. Your feedback is invaluable because it highlights a critical gap in my guidance. The problem isn't a bug in the code you've integrated, but rather a missing step in the development process and a small but crucial configuration error in `package.json`.

The core issue is how to run and see the extension. Simply running `npm run watch` compiles the code, but it doesn't load it into VS Code. To see the extension in action, you need to launch a special "Extension Development Host" window.

Additionally, I missed adding a vital piece of configuration called `activationEvents` to the `package.json` file. This property tells VS Code *when* to load our extension. Without it, even if you were running the extension correctly, the view wouldn't show up.

Here is my course of action to get everything working:

1.  **Explain the Workflow:** I will create a new, clear documentation artifact, **`A7. DCE - Development and Testing Guide.md`**, that explains precisely how to run the extension using the `F5` debugger and where to find the UI. This will be our guide for testing moving forward.

2.  **Fix `package.json`:** I will provide an updated `package.json` that includes the necessary `activationEvents` property. This ensures VS Code activates our extension when you click on its activity bar icon. I will also remove the now-obsolete command contributions, as we planned in the last cycle.

3.  **Update Master Artifact List:** I will update `A0. DCE Master Artifact List.md` to include our new development guide.

After you apply these changes and follow the new guide, you should see the spiral icon in the activity bar of the new VS Code window and be able to access the Context Chooser.

### Updated and New Files

Here is a list of the files I will be creating or modifying:
-   `package.json` (Updated)
-   `A0. DCE Master Artifact List.md` (Updated)
-   `A7. DCE - Development and Testing Guide.md` (New)

***
```
<package.json>

</package.json>
```***
```
<A0. DCE Master Artifact List.md>

</A0. DCE Master Artifact List.md>
```
***
```
<A7. DCE - Development and Testing Guide.md>

</A7. DCE - Development and Testing Guide.md>
```
</previous cycle 7 summary of actions>


<Cycle 7>
ahhhh okay that makes much more sense, yeah that would be perfect. i saw the spiral.svg file when u made it, but now i know its supposed to be the icon on the left vertical bar. i dont and havent seen it there yet. im running `npm run watch` in my vs code terminal. do i have to restart vs code? should i run `npm run watch` in an external terminal? ill give you a screenshot.

i will now roll in the file changes below.

<previous cycle 6 summary of actions>
Of course. I understand the feedback. You're right, my previous response was based on the assumption that the UI was already visible and intuitive, but your feedback makes it clear there's a disconnect between expectation and reality. The issue is not a bug in the code, but a matter of user experience and guidance. The checkboxes are not appearing in the place you expect them to.

Let me clarify: VS Code's API does not allow for adding interactive elements like checkboxes directly into the built-in File Explorer. The standard and most powerful method for creating rich, custom UI like this is to build a dedicated "Webview" within a custom panel. This is exactly what we have done.

The file tree with checkboxes is located in its own view, inside a new panel in the VS Code Activity Bar (the far-left vertical bar). You should see a new icon—a spiral—which I've designated for our "Data Curation Environment".

**Please look for the spiral icon in your Activity Bar. Clicking it will open the "Context Chooser" panel, where you will see the interactive file tree with checkboxes.**

Since `npm run watch` is running without errors, this should be visible and functional now.

With that clarification, my goal for this cycle is to make those checkboxes functional by implementing the final piece of Phase 1. I will add a "Flatten Context" button to our new view. When you click it, the extension will process all your checked files and generate the `flattened_repo.md` file in your project root, completing the core workflow.

Here is my course of action:

1.  **Implement the Flattener Service:** I will create a new backend service, `flattener.service.ts`, which will contain the logic to read the selected files, gather their content and metadata, and write the final `flattened_repo.md` file.

2.  **Add a "Flatten Context" Button:** I will update the `context-chooser.view/view.tsx` file to include a "Flatten Context" button. This button will be the primary user interaction for triggering the flattening process.

3.  **Wire up the IPC Communication:** I will update `on-message.ts` to handle the message from the new button, passing the list of selected file paths to the new `FlattenerService`.

4.  **Refactor for Simplicity:** To simplify the architecture, I will remove the "zap" icon command (`dce.flattenContext`) from `package.json` and `commands.ts`, as the new button inside the view provides a more direct and intuitive user experience.

The following file updates will accomplish this.

### Updated Files

Here is a list of the files I will be creating or modifying:
-   `package.json` (Updated)
-   `src/backend/commands/commands.ts` (Updated)
-   `src/backend/services/flattener.service.ts` (New)
-   `src/backend/services/services.ts` (Updated)
-   `src/client/views/context-chooser.view/on-message.ts` (Updated)
-   `src/client/views/context-chooser.view/view.scss` (Updated)
-   `src/client/views/context-chooser.view/view.tsx` (Updated)

***
```
<package.json>

</package.json>
```
***
```
<src/backend/commands/commands.ts>

</src/backend/commands/commands.ts>
```
***
```
<src/backend/services/flattener.service.ts>

</src/backend/services/flattener.service.ts>
```
***
```
<src/backend/services/services.ts>

</src/backend/services/services.ts>
```
***
```
<src/client/views/context-chooser.view/on-message.ts>

</src/client/views/context-chooser.view/on-message.ts>
```
***
```
<src/client/views/context-chooser.view/view.scss>

</src/client/views/context-chooser.view/view.scss>
```
***```
<src/client/views/context-chooser.view/view.tsx>

</src/client/views/context-chooser.view/view.tsx>
```
</previous cycle 6 summary of actions>
</Cycle 7>


<Cycle 6>
okay be sure to provide a list of files ur adding/updating and show which are new that helps me track between conversations.

haha okay... so i rolled those changes in now... no errors, `npm run watch` is running... i guess i have a little experiential blindness right now, because i dont know if at some point im just going to start to see a checkbox in my vs code file explorer, because i mean that is my naive expectation here. either correct me if im wrong, or if im right, continue developing as i have no other feeback other than i still do not have a checkbox in my explorer and there are no ts errors currently.

<previous cycle 5 summary of actions>
Excellent, with the compilation errors from the initial scaffolding resolved, we can now proceed to the core task of Phase 1: implementing the user interface for the "Context Chooser". Our goal for this cycle is to display an interactive file tree in our extension's sidebar view, complete with checkboxes for selecting files and folders.

To achieve this efficiently, we will adapt and integrate the high-quality UI components from the `The-Creator-AI-main` reference repository. This will give us a professional and functional UI much faster than building it from scratch.

Here is my course of action:

1.  **Create Reusable UI Components:** I will create a new `src/client/components` directory to house the reusable React components adapted from the reference repository. This will involve creating several new files:
    *   `Checkbox.tsx`: A foundational checkbox component that correctly handles an "indeterminate" state, which is crucial for folder selections.
    *   `tree-view/TreeView.tsx` and `tree-view/TreeView.utils.ts`: A generic, reusable `TreeView` component that will serve as the base for our file tree.
    *   `file-tree/FileTree.tsx` and `file-tree/FileTree.utils.ts`: The main `FileTree` component. This will consume the workspace file structure, render it using the `TreeView`, and manage the checkbox selection logic.

2.  **Implement the Context Chooser View:** I will update our main `context-chooser.view` to use these new components, effectively replacing the current placeholder text with a live, interactive file tree.
    *   `view.tsx`: This file will be updated to manage the application state (list of files, selected paths) and handle communication with the backend to fetch the file structure when the view loads.
    *   `view.scss`: I will add some basic SASS styling to ensure the file tree is visually appealing and integrates well with the VS Code theme.

These actions will result in a visible and functional file tree with checkboxes within our extension's custom view, marking a significant milestone for Phase 1.

Here are the new and updated files.

***
```
<src/client/components/Checkbox.tsx>

</src/client/components/Checkbox.tsx>
```
***
```
<src/client/components/tree-view/TreeView.tsx>

</src/client/components/tree-view/TreeView.tsx>
```
***
```
<src/client/components/tree-view/TreeView.utils.ts>

</src/client/components/tree-view/TreeView.utils.ts>
```
***
```
<src/client/components/file-tree/FileTree.tsx>

</src/client/components/file-tree/FileTree.tsx>
```
***
```
<src/client/components/file-tree/FileTree.utils.ts>

</src/client/components/file-tree/FileTree.utils.ts>
```
***
```
<src/client/views/context-chooser.view/view.tsx>

</src/client/views/context-chooser.view/view.tsx>
```
***
```
<src/client/views/context-chooser.view/view.scss>

</src/client/views/context-chooser.view/view.scss>
```

</previous cycle 5 summary of actions>

</Cycle 6>


<Cycle 5>
okay, no more ts errors... tahts good. what are the remaining steps in between me and using my checkboxes? currently its running but i dont see checkboxes in my vs code file explorer, so we arent done with phase 1 yet.

<previous cycle 4 summary of actions>
Okay, we've successfully deployed the scaffold and now we're in the classic "first compile" phase of development. Seeing 18 errors after an `npm install` and `webpack --watch` is completely normal and expected. It means the initial setup has revealed all the misconfigurations and missing pieces at once. Now we can systematically knock them down.

I have analyzed the 18 errors, and they fall into a few distinct categories: Webpack configuration issues (missing polyfills for browser environments), missing dependencies, and minor TypeScript type errors in the scaffolded code.

Here is my course of action to resolve these errors:

1.  **Fix Webpack Polyfill Issues:** The most frequent error, `Can't resolve 'process/browser'`, is due to Webpack 5 no longer automatically providing polyfills for Node.js core modules in a browser context. I will fix this by adding the `process` package to our `devDependencies` which our `webpack.config.js` is already configured to use.

2.  **Add Missing Dependencies:** The `reflect-metadata` package is imported but was not included in our `package.json`. I will add this to the dependencies.

3.  **Correct TypeScript Errors:** I will fix the three specific TypeScript errors that were identified:
    *   Add the missing `initialize()` method to our `ServiceContainer`.
    *   Correctly access the `fsPath` from the `workspaceRoots` array in `fs.service.ts`.
    *   Use the correct property accessor for the `fsService` in `on-message.ts`.

These changes should resolve all 18 errors and allow the extension to compile successfully, setting us up to begin implementing the file tree functionality in the next cycle.

Here are the updated files.

***
```
<package.json>

</package.json>
```
***```
<src/extension.ts>

</src/extension.ts>
```
***
```
<src/backend/services/services.ts>

</src/backend/services/services.ts>
```
***
```
<src/backend/services/fs.service.ts>

</src/backend/services/fs.service.ts>
```***
```
<src/client/views/context-chooser.view/on-message.ts>

</src/client/views/context-chooser.view/on-message.ts>
```

</previous cycle 4 summary of actions>

</Cycle 5>


<Cycle 4>
okay i ran the script, this is what i saw:

```
PS C:\Projects\DCE> node deploy_scaffold.js
Starting scaffold deployment...
✅ Created: package.json
✅ Created: tsconfig.json
✅ Created: webpack.config.js
✅ Created: .gitignore
✅ Created: .vscodeignore
✅ Created: public/spiral.svg
✅ Created: src/extension.ts
✅ Created: src/common/types/file-node.ts
✅ Created: src/common/types/vscode-webview.d.ts
✅ Created: src/common/ipc/channels.enum.ts
✅ Created: src/common/ipc/channels.type.ts
✅ Created: src/common/ipc/get-vscode-api.ts
✅ Created: src/common/ipc/client-ipc.ts
✅ Created: src/common/ipc/server-ipc.ts
✅ Created: src/common/utils/view-html.ts
✅ Created: src/client/views/index.ts
✅ Created: src/client/views/context-chooser.view/index.ts
✅ Created: src/client/views/context-chooser.view/on-message.ts
✅ Created: src/client/views/context-chooser.view/view.tsx
✅ Created: src/client/views/context-chooser.view/view.scss
✅ Created: src/backend/commands/commands.ts
✅ Created: src/backend/commands/register-commands.ts
✅ Created: src/backend/services/services.ts
✅ Created: src/backend/services/fs.service.ts
\n🚀 Scaffold deployment complete! 🚀
Next steps:
1. Run `npm install` to install dependencies.
2. Run `npm run watch` or press F5 in VS Code to start the extension.
PS C:\Projects\DCE>
```

cool, haha. so okay i then ran the two commands as suggested above and received the following 18 typescript errors. i guess we are in dev mode now:

<ts errors>

</ts errors>

<previous cycle 3 summary of actions>
Of course. I understand the feedback and the plan for this cycle. You've simplified the flattening process, which is great, and now we need to build upon the analysis from the last cycle to create the tangible file structure for our extension. The idea of creating a deployment script as an artifact is an excellent way to bootstrap the project, ensuring consistency and solving the manual file creation problem.

My course of action for this cycle is as follows:

1.  **Create Target File Structure Artifact:** I will create a new documentation artifact, `A5. DCE - Target File Structure.md`, to provide a clear, visual representation of the directory and file structure we are building. This will serve as a quick reference for the project's layout, based on the architecture we adopted from `The-Creator-AI-main` repository.

2.  **Create Scaffolding Deployment Script:** I will author the main deliverable for this cycle, a new artifact named `A6. DCE - Initial Scaffolding Deployment Script.md`. This artifact will contain a Node.js script (`deploy_scaffold.js`). When executed, this script will:
    *   Create the entire directory hierarchy (e.g., `src/backend/services`, `src/client/views`, etc.).
    *   Generate the essential configuration files (`package.json`, `tsconfig.json`, `webpack.config.js`, `.gitignore`, etc.), adapted from the reference repository to suit our project's initial needs.
    *   Create placeholder files for key modules and components to establish the complete architectural pattern.

3.  **Update Master Artifact List:** I will update `A0. DCE Master Artifact List.md` to include the two new documentation artifacts (`A5` and `A6`), ensuring our project's source of truth remains current.

This approach directly fulfills your requests by providing a planned file structure and a script to deploy it, setting a solid foundation for us to begin implementing the Context Chooser functionality in the subsequent cycle.

Here are the new and updated artifacts.

***
```
<A0. DCE Master Artifact List.md>

</A0. DCE Master Artifact List.md>
```
***
```
<A5. DCE - Target File Structure.md>

</A5. DCE - Target File Structure.md>
```
***
```
<A6. DCE - Initial Scaffolding Deployment Script.md>

</A6. DCE - Initial Scaffolding Deployment Script.md>
```
</previous cycle 3 summary of actions>
</Cycle 4>

<Cycle 3>
oh okay, actually i realize i was over-complicating it with the `flatten-docs.js`, if instead i just point `bootstrap-flattener.js` back one directory, itll pick up the artifacts as well.

i ran your new `bootstrap-flattener.js` and the metadata is helpful, and i dont see any files that are corrupt or overly verbose in the `flatten_repo.md` output.

okay, i think if there is anymore planning left you would have, or could do it in the start of this cycle. in this cycle, lets flesh out our extension structure, based on insights from the provided `The-Creator-AI-main` repository aka the `reference repo`.

when we do start coding, it might be cool if you can instead of just making the code files, for the first round, make a script that has the code files in it, and have the script 'deploy' the code files. that will solve the manual creation of the files. in fact, make the script that makes the code files an artifact. yo dawg, i heard you like key/value pairs?

we would want a file tree artifact, it helps in planning to have it.

<Previous cycle 2 summary of actions>
I have reviewed your feedback and the newly flattened repository. It's clear that my initial `bootstrap-flattener.js` was too simplistic and that the provided `The-Creator-AI-main` repository is a fantastic starting point, far more advanced than I anticipated. This significantly accelerates our project.

My course of action for this cycle is as follows:

1.  **Enhance Flattener Script:** I will upgrade `bootstrap-flattener.js` to include the metadata you requested. Drawing inspiration from the `flattenv2.js` script you provided, I will add:
    *   A metadata header with totals for files, lines, characters, and tokens.
    *   A "Top 10 Files by Tokens" list.
    *   A complete, numbered list of all processed files with their individual stats.
    *   A configurable ignore list, pre-populated with common directories like `.git` and `node_modules`, and files like `package-lock.json`, to prevent them from bloating the context.

2.  **Provide Documentation Flattener:** As you noted, the script to flatten the `src/Artifacts` directory should be separate. I will provide the `flatten-docs.js` script you supplied as a distinct artifact.

3.  **Analyze Reference Repository:** I have analyzed the code from `flattened_repo.md`. It's a nearly complete implementation of a sophisticated AI coding assistant extension. To capture my findings, I will create a new documentation artifact:
    *   **`A4. DCE - Analysis of The-Creator-AI Repo.md`**: This document will detail the architecture, key components, and existing features of the reference repository and map them to our project's three phases. This will serve as a foundational analysis for our subsequent work.

4.  **Update Planning Documentation:** The discovery of the reference repository's capabilities fundamentally changes our project plan from "building from scratch" to "adapting and integrating." I will update our existing documentation to reflect this new reality:
    *   **`A1. DCE - Project Vision and Goals.md`**: Update to acknowledge the accelerated timeline and refined scope.
    *   **`A2. DCE - Phase 1 - Context Chooser - Requirements & Design.md`**: Revise requirements to focus on *analyzing and adapting* the existing `FileTree` component found in the reference repo, rather than building a new one.
    *   **`A3. DCE - Technical Scaffolding Plan.md`**: Replace our theoretical scaffolding with the concrete, proven architecture of the `The-Creator-AI-main` repository, adopting it as our official blueprint.

This approach aligns our documentation (our "Source of Truth") with the new information we've gained, setting a clear and accurate path forward.

Here are the updated and new artifacts.

***
```
<bootstrap-flattener.js>

</bootstrap-flattener.js>
```
***
```
<flatten-docs.js>

</flatten-docs.js>
```
***
```
<A4. DCE - Analysis of The-Creator-AI Repo.md>

</A4. DCE - Analysis of The-Creator-AI Repo.md>
```
***
```
<A1. DCE - Project Vision and Goals.md>

</A1. DCE - Project Vision and Goals.md>
```
***
```
<A2. DCE - Phase 1 - Context Chooser - Requirements & Design.md>

</A2. DCE - Phase 1 - Context Chooser - Requirements & Design.md>
```
***
```
<A3. DCE - Technical Scaffolding Plan.md>

</A3. DCE - Technical Scaffolding Plan.md>
```
</Previous cycle 2 summary of actions>
</Cycle 3>


<Cycle 2>
nice, this is exactly what we needed. ive created:
C:\Projects\DCE\src\Artifacts\A0. DCE Master Artifact List.md
C:\Projects\DCE\src\Artifacts\A1. DCE - Project Vision and Goals.md
C:\Projects\DCE\src\Artifacts\A2. DCE - Phase 1 - Context Chooser - Requirements & Design.md
C:\Projects\DCE\src\Artifacts\A3. DCE - Technical Scaffolding Plan.md
C:\Projects\DCE\bootstrap-flattener.js

okay, i just ran `node bootstrap-flattener.js C:\Projects\DCE\The-Creator-AI-main` and i got:
`✅ Success! Flattened repository saved to: C:\Projects\DCE\flattened_repo.md`

nice, ill paste the `flattened_repo.md` below. your `bootstrap-flattener.js` doesnt seem to provide a metadata such as top 20 or a list of all files and their tokens, which is valuable for me. for example, i just went through manually to do a cursory review, and i see the package-lock.json is massive and rather useless for our current endeavours. if i had my metadata, i would have seen that at a glance. i just manually removed it. please a) enhance the bootstrap-flattener from this perspective and b) review the newly created `flattened_repo.md`, provide me with your feeback, and make any adjustments that you see needed in our planning documentation, and if need be, create additional planning documentation given the overall project and the time you have in this cycle.

oh i almost forgot, you do not yet have the artifacts in-context. this is the flatten_docs.js script, i think it should be separate from the boostrap-flattener.js cause its something ill run each time there are additions or updates in our src\Artifacts directory.

eventually, we'd be able check use the checkbox to just select the 'artifacts' folder, and then so any changes to it get automatically picked up. for now, we need our manual flatten script to build out the extension itself.

<Previous Cycle 1 Summary of Actions>
Of course. I understand the feedback from your last cycle. My previous response was premature; jumping straight into coding without first establishing the planning documentation was a misstep and goes against our established workflow. I see now that creating the "source of truth" artifacts is the necessary first step, and I appreciate you redirecting me. It's critical to have a solid plan before writing code, and I will adhere to this principle going forward.

I also understand the immediate goal is to create a simple, standalone script to flatten the `the-creator-ai-main` repository. This will bring its contents into our context, allowing us to analyze it and use it as a reference for building the actual extension in subsequent cycles.

### Course of Action

1.  **Create Foundational Documentation:** I will author the primary planning documents for our Data Curation Environment (DCE) extension. This will establish our project's "source of truth" and guide future development.
    *   **`A0. DCE Master Artifact List.md`**: A new master list for this project to track our documentation.
    *   **`A1. DCE - Project Vision and Goals.md`**: A high-level document outlining the project's purpose and the three-phase plan.
    *   **`A2. DCE - Phase 1 - Context Chooser - Requirements & Design.md`**: A detailed specification for the first phase, covering functional and technical requirements for the checkbox-based file selector and flattener.
    *   **`A3. DCE - Technical Scaffolding Plan.md`**: A blueprint for the extension's file structure and the VS Code APIs we will use, effectively planning the files I prematurely created last cycle.

2.  **Create Bootstrap Flattener Script:** I will create a standalone Node.js script named `bootstrap-flattener.js`. Its sole purpose is to perform a one-time flattening of the `the-creator-ai-main` directory. This will provide the necessary context for us to begin development in the next cycle. The script will be based on the logic from the `flattenv*.js` examples you provided.

This approach ensures we are aligned with the "documentation first" methodology and directly addresses your request to bring the example repository into context for our next steps.

Here are the new artifacts.

***
```
<A0. DCE Master Artifact List.md>

</A0. DCE Master Artifact List.md>
```
***
```
<A1. DCE - Project Vision and Goals.md>

</A1. DCE - Project Vision and Goals.md>
```
***
```
<A2. DCE - Phase 1 - Context Chooser - Requirements & Design.md>

</A2. DCE - Phase 1 - Context Chooser - Requirements & Design.md>
```
***
```
<A3. DCE - Technical Scaffolding Plan.md>

</A3. DCE - Technical Scaffolding Plan.md>
```
***
```
<bootstrap-flattener.js>

</bootstrap-flattener.js>
```
</Previous Cycle 1 Summary of Actions>
</Cycle 2>



<Cycle 1>
no not quite, you're getting ahead of yourself. i only wanted a script from you that would flatten the github repo that i downloaded and showed you part of its structure in my screenshot. its located here:
`C:\Projects\DCE\The-Creator-AI-main`

where `DCE` is my project root. ive just got that Creator repo in my root so we can flatten it with the script you give me and bring it into context. once we have it in context, we can plan our extension. you started creating files when we havent seen the existing structure, u see what i mean? unless you just legit know exactly how to code what im asking and im wasting time providing an example... either way, we still are missing -all- planning documentation artifacts. we create documentation first and plan it out. havent you read the interaction schema? we need our source of truth artifacts. and you gave me a flatten.ts, but im not sure if it would do what i wanted, i was expecting a .js file like the examples i provided you. i was only half-joking when i was talking about making a project about making a project, i need you to understand the why we are doing what we are doing here or else we wont be successful. the joke was a metacognitive joke. can you try again, given this feedback?

<Cycle 0 Response>
Of course. It's frustrating when a tool's limitations get in the way of your workflow. I understand the need for complete, uninterrupted output and will adhere to that. Misaligned self-correction is counter-productive, and I will focus on completing the task as specified.

Based on your request, I will now create the foundational files for a VS Code extension designed to meet Phase 1 of your project scope: a "Context Chooser" with checkboxes in the file explorer.

### Course of Action

1.  **Project Scaffolding:** I will create the essential files for a new VS Code extension. This includes `package.json` to define the extension's structure and capabilities, `tsconfig.json` for TypeScript compilation, and a `.vscodeignore` file.
2.  **Extension Entry Point (`extension.ts`):** This file will contain the `activate` function, which is the starting point for the extension. It will register the custom Tree View and the commands.
3.  **Custom Tree View (`FileTreeDataProvider.ts` & `FileItem.ts`):** To implement checkboxes, a custom Tree View is required. I will create a `FileTreeDataProvider` class to populate a view with items from the workspace. Each item will be an instance of a custom `FileItem` class, which includes the checkbox state. This will create a new panel in the Activity Bar with a browsable file tree where every file and folder has a checkbox.
4.  **Flattening Logic (`flattener.ts`):** I will adapt the logic from your provided `flattenv2.js` script into a TypeScript module. This module will take a list of file paths (provided by the Tree View) and generate a single, concatenated string with metadata, which can then be saved to a file.
5.  **Commands and UI:** I will define three commands: "Flatten Selected Files," "Select All," and "Deselect All." These will be accessible via icons in the title bar of our new custom view for ease of use.

Here are the files for the VS Code extension. You can place these within your `the-creator-ai-main` project structure.

***

```
<package.json>

</package.json>
```

```
<tsconfig.json>

</tsconfig.json>
```

```
<.vscodeignore>

</.vscodeignore>
```

```
<src/extension.ts>

</src/extension.ts>
```

```
<src/FileTreeDataProvider.ts>

</src/FileTreeDataProvider.ts>
```

```
<src/FileItem.ts>

</src/FileItem.ts>
```

```
<src/flattener.ts>

</src/flattener.ts>
```

### Review of Work & Next Steps

I have created six new files that form the basis of the "Data Curator" VS Code extension.

*   **`package.json`**: Defines the extension, its commands, and its custom UI view.
*   **`tsconfig.json`**: Configures the TypeScript compiler.
*   **`.vscodeignore`**: Ensures the packaged extension is lean.
*   **`src/extension.ts`**: The main activation script that registers all functionality.
*   **`src/FileTreeDataProvider.ts` & `src/FileItem.ts`**: These two files work together to create the custom file explorer with checkboxes, which is the core of this phase. I've also included the necessary proxy command to handle clicks on the tree items correctly. **You will need to add the one-line call to `registerProxyCommand` in `extension.ts` as noted in the comments of `FileItem.ts`**.
*   **`src/flattener.ts`**: A robust module to perform the file concatenation, adapted from your scripts.

To run this, you would need to:
1.  Place these files in your project.
2.  Run `npm install` in your terminal at the project root to install the dependencies listed in `package.json`.
3.  Run `npm run compile` to build the TypeScript files into JavaScript in the `out` directory.
4.  Open the project in VS Code and press `F5` to launch the Extension Development Host, where you can test the new functionality. A new "Data Curator" icon (a checklist) should appear in the activity bar.
</Cycle 0 Response>
</Cycle 1>
<Cycle 0>
okay, so the way we will work on building out this project is in three phases. this is because AI Studio is free, and in order to fully deliver phase 2, it will require an API key. the api key will be supplied by my employer after phase 1 has been completed and we can show the functionality.

the output that should be produced from the selection made from the checkbox feature we will create will be to create a `flattened_repo.md` file. the flattened repo is just all the files that have been selected. this is a data curation environment. for any given cycle, certain data will/wont be needed. the checkboxes in an existing vscode file explorer perfectly allows the simplest way to manage a necessarily manual task--via a single mouse click. for instance, if properly organized into files, a data curator may switch in between two similar projects by simply unchecking project a, and selecting project b. then, then we execute our script, the script will 'package' the current selection into the `flattened_repo.md` file, which is placed in the project root, which is where this `prompt.md` file is also located. then, the curated only needs to copy the entire contents from the `flattened_repo.md` into their `prompt.md` file, and they are actively working through cycles in a data curated project. the environment is functional. does that make sense? i already have a script which performs this action. the new addition is instead of the management of which files in context being a `files_list.txt`, we are adding another layer which is the checkboxes to control. it can still reside in a `files_list.txt` if needed, structurally, to function, its just now other users who are following my process will no longer need to open `files_list.txt` as all selection/de-selection is now controlled by the checkboxes. ill provide that script. in addition, ive got a github project that ive downloaded that does precisely that; it creates the checkboxes supposedly in vscode. the screenshots are only mobile but it seems like it does what we want, or close enough that it is worth bringing into context to get started, i think.

flattenv2.js - older script, used for my game project: AI Ascent. main drawback: manually managed files_list.txt
flattenv5.js - newer, state aware script, capable of converting PDF to markdown. main drawback: although it hasnt bothered me, the files_list.txt seems to just keep growing larger and larger, so when i do need to go in and de-select something, or re-select something, it becomes cumbersome. the checkboxes should help solve for this.
flatten_docs.js - new script, i created this when i began projects which required the 'combination' of datasets from disparate vs code projects. I was starting to create a 'report viewer' for my 'cognitive security' report in my 'aiascent game' project, but in order to do that, i needed to get some data from my report generation vs code project. i found the easiest way to do that was to actually just create a new artifact in my game project docs folder, and drop the report flattened repo in that, and then when i run my `flatten_docs.js` itll get picked up. 

so then i guess for this phase to be a success, we want a checkbox to enable/disable auto-selection (when a new file is created, its auto-checked), and a button to flatten currently selected, and the actual checkbox for all files/folders.

ill provide you with a screenshot of my vscode environment, its basically just a project folder, this prompt file, and the repo that may do the checkbox thing. help me make my vs code extension! my plan would be to be able to share it with my colleagues so they can do the same with their own environment.

first, lets make a script that i can place with my prompt.md that will get us started to build the script. we will want to flatten to existing `the-creator-ai-main` itself so that we can bring it into context, so that we can get started. what would you categorize this as? its very unique. we are doing a project to automate a process, but the process that we are automating is the manual process that must take place, to perform the project. im not sure how this should be articulated haha, what do you think?

reference files list:
A0. Master Artifact List.md
flattenv2.js
flattenv5.js
flatten_docs.js
flattened_repo.txt
</Cycle 0>
</M6. Cycles>

<A0. Master Artifact List.md>
# Artifact A0: Master Artifact List
# Date Created: Cycle 1224
# Author: AI Model & Curator
# Updated on: C1400 (Add A187 for UKI CTO Meeting Briefing.)
# Updated on: C1396 (Add A186 for RDS Front Matter Content.)

## 1. Purpose

# This file serves as the definitive, parseable list of all documentation artifacts in the "AI Ascent" project. It is used by the scripts in A155 to generate context files.

## 2. Formatting Rules for Parsing

# *   Lines beginning with `#` are comments and are ignored.
# *   `##` denotes a major category header and is ignored.
# *   `###` denotes an artifact entry. The text following it is the artifact's full name and ID.
# *   Lines beginning with `- **Description:**` provide context for the Ascentia KB.
# *   Lines beginning with `- **Tags:**` provide keywords for Inference.
# *   The `!!` prefix on an artifact name (e.g., `### !!A103...`) marks it as restricted from the Ascentia KB but included in the developer context.
# *   The `@@` prefix on an artifact name (e.g., `### @@A65...`) marks it as an Ascentia-only artifact, to be excluded from the developer context but included in the Ascentia KB.

## 3. Artifacts List

## I. Core Game Mechanics & Loops

### A1. Startup Company Gameplay Loops -> AI Ascent Gameplay Loops
- **Description:** Outlines the core gameplay loops, shifting from a generic startup to an AI-focused company, including phase progression, goals, and key mechanics.
- **Tags:** gameplay, core loop, progression, game design, phases, pvp, multiplayer
### A2. Server and Hardware Loop
[...]
</A0. Master Artifact List.md>
<flattenv2.js>
#!/usr/bin/env node
/**
 * flattenv2.js
 *
 * This script does the following:
 * 1. Reads a list of file paths from 'files_list.txt' (one file path per line).
 *    - Lines starting with '#' (after trim) are ignored (treated as comments).
 *    - Any lines that come after a dividing line (10 or more '#' in a row) are disregarded.
 *    - Duplicate file paths are ignored.
 * 2. For each file:
 *    - If it's an image (including webp), parse minimal metadata (width/height/size/etc.) and do NOT embed raw content.
 *    - Otherwise, read the file as text, then calculate line count, character count, and an approximate token count (chars/4).
 * 3. Prints an aggregated summary (total lines, total characters, total tokens) across all **text** files.
 *    (Images will be included in total “files,” but lines/chars/tokens for them remain zero.)
 * 4. Generates a `flattened_repo_v2.txt` file that includes:
 *    - Overall totals
 *    - A "Top 10 Files by Tokens" list
 *    - A list of all files (with per-file line, character, token counts), sequentially numbered
 *    - The full contents of each file in `<filePath>...</filePath>` blocks
 *      or `<metadata>` block for images.
 *
 * Usage:
 * 1. Create a 'files_list.txt' file in the same directory as this script, containing absolute paths.
 * 2. Lines in 'files_list.txt' beginning with '#' are comments and ignored.
 * 3. A dividing line (10 or more '#' in a row) can be placed in the file; anything below it is ignored.
 * 4. Run: node flattenv2.js
 */

const fs = require('node:fs/promises');
const path = require('node:path');

// Change here: new output filename so we don't overwrite v1:
const OUTPUT_FILENAME = './docs/A65. flattened_repo_ai-ascent.txt.md';

/**
 * Minimal set of image extensions that we want to handle with metadata.
 * ** UPDATED: Added .webp to this set **
 */
const imageExts = new Set([
  '.ico',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.bmp',
  '.svg',
  '.webp', // <-- Added webp here
]);

function isImageFile(filePath) {
  return imageExts.has(path.extname(filePath).toLowerCase());
}

/**
 * Attempt to parse minimal metadata for an image buffer.
 * - PNG: checks signature + IHDR chunk
 * - GIF: checks signature + screen descriptor
 * - JPEG: scans for SOF0 marker
 * - Otherwise (including WEBP): returns file size fallback
 */
async function parseImageMetadata(filePath) {
  try {
    const buffer = await fs.readFile(filePath);
    const sizeInBytes = buffer.length;

    // PNG signature: 89 50 4E 47 0D 0A 1A 0A
    if (
      buffer.length > 24 &&
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47 &&
      buffer[4] === 0x0d &&
      buffer[5] === 0x0a &&
      buffer[6] === 0x1a &&
      buffer[7] === 0x0a
    ) {
      const ihdrIndex = buffer.indexOf('IHDR');
      if (ihdrIndex !== -1 && ihdrIndex + 8 < buffer.length) {
        const width = buffer.readUInt32BE(ihdrIndex + 4);
        const height = buffer.readUInt32BE(ihdrIndex + 8);
        return {
          format: 'PNG',
          width,
          height,
          sizeInBytes,
        };
      }
    }

    // GIF signature: "GIF87a" or "GIF89a"
    if (
      buffer.length > 10 &&
      buffer[0] === 0x47 && // 'G'
      buffer[1] === 0x49 && // 'I'
      buffer[2] === 0x46 && // 'F'
      buffer[3] === 0x38 &&
      (buffer[4] === 0x39 || buffer[4] === 0x37) &&
      buffer[5] === 0x61
    ) {
      // width at bytes 6-7, height at bytes 8-9
      const width = buffer[6] | (buffer[7] << 8);
      const height = buffer[8] | (buffer[9] << 8);
      return {
        format: 'GIF',
        width,
        height,
        sizeInBytes,
      };
    }

    // JPEG: search for Start Of Frame marker (SOF0 or SOF2)
    if (buffer.length > 11 && buffer[0] === 0xff && buffer[1] === 0xd8) {
      let pos = 2;
      while (pos < buffer.length - 9) {
        if (buffer[pos] === 0xff && (buffer[pos + 1] & 0xf0) === 0xc0) {
          const height = buffer.readUInt16BE(pos + 5);
          const width = buffer.readUInt16BE(pos + 7);
          if (width > 0 && height > 0) {
            return {
              format: 'JPEG',
              width,
              height,
              sizeInBytes,
            };
          }
        }
        // Advance to the next marker segment
        // Marker segments start with FF xx, followed by a 2-byte length field
        if (buffer[pos] === 0xff && buffer[pos + 1] !== 0x00 && buffer[pos + 1] !== 0xff && (buffer[pos+1] < 0xd0 || buffer[pos+1] > 0xd9)) {
            // Check if it's a marker segment with a length field
            if (pos + 3 < buffer.length) {
                const length = buffer.readUInt16BE(pos + 2);
                pos += length + 2; // Move past this segment
            } else {
                pos++; // Should not happen in valid JPEG, but prevent infinite loop
            }
        } else {
             pos++; // Move byte by byte if not a marker segment start or a special marker
        }
      }
    }

    // Otherwise BMP, ICO, SVG, WEBP etc. -> just return size
    // Note: No specific width/height parsing for these formats currently.
    return {
      format: path.extname(filePath).toUpperCase().substring(1) || 'Unknown/Other', // Use extension if known
      sizeInBytes,
    };
  } catch (err) {
    return {
      format: 'Unknown',
      error: err.message || 'Failed reading image buffer',
      sizeInBytes: -1 // Indicate error retrieving size
    };
  }
}

/**
 * Reads a single file (text vs. image).
 *   - If image => return lines=0, chars=0, tokens=0, plus { metadata }.
 *   - If text => read text, compute stats, store content.
 */
async function getFileStatsAndContent(filePath) {
  try {
    if (isImageFile(filePath)) {
      // For images, parse metadata, no raw content
      const metadata = await parseImageMetadata(filePath);
      // Ensure sizeInBytes is present even if metadata parsing had issues
      if (metadata.sizeInBytes === undefined || metadata.sizeInBytes < 0) {
           try {
             const stats = await fs.stat(filePath);
             metadata.sizeInBytes = stats.size;
           } catch (statErr) {
             // If stat also fails, keep size as -1 or indicate error
             metadata.sizeInBytes = -1;
             if (!metadata.error) metadata.error = `Failed stat: ${statErr.message}`;
           }
      }
      return {
        filePath,
        lines: 0,
        characters: 0,
        tokens: 0,
        content: null, // no text content
        imageMetadata: metadata,
        error: metadata.error || null, // Propagate error from metadata parsing if any
      };
    } else {
      // It's a text file; read and compute stats
      const content = await fs.readFile(filePath, 'utf-8');
      const lines = content.split('\n').length;
      const characters = content.length;
      const tokens = Math.ceil(characters / 4); // simplistic
      return {
        filePath,
        lines,
        characters,
        tokens,
        content,
        imageMetadata: null,
        error: null,
      };
    }
  } catch (error) {
     // Handle file reading errors for both text and image files
     let sizeInBytes = -1;
     try {
         const stats = await fs.stat(filePath);
         sizeInBytes = stats.size;
     } catch (statErr) { /* ignore secondary error */ }

     return {
        filePath,
        lines: 0,
        characters: 0,
        tokens: 0,
        content: '',
        imageMetadata: isImageFile(filePath) ? { format: 'Unknown', error: error.message, sizeInBytes: sizeInBytes } : null,
        error: error.message,
     };
  }
}

async function main() {
  const scriptDir = process.cwd();
  const fileListPath = path.join(scriptDir, 'files_list.txt');

  let filePaths = [];
  try {
    const fileListContent = await fs.readFile(fileListPath, 'utf-8');
    const lines = fileListContent.split('\n');
    const seenPaths = new Set(); // Use a Set for efficient duplicate checking

    for (let rawLine of lines) {
      const line = rawLine.trim();

      // Stop if dividing line
      if (/^#{10,}/.test(line)) break;

      if (line === '' || line.startsWith('#')) continue;

      // Use absolute path resolution relative to script/cwd for consistency
      const absPath = path.resolve(scriptDir, line);

      if (!seenPaths.has(absPath)) {
        filePaths.push(absPath);
        seenPaths.add(absPath);
      } else {
        console.warn(`Duplicate file path ignored: ${line} (resolved to ${absPath})`);
      }
    }
  } catch (error) {
    console.error(`Error reading files_list.txt: ${error.message}`);
    if (error.code === 'ENOENT') {
        console.error(`Make sure 'files_list.txt' exists in the directory: ${scriptDir}`);
    }
    return;
  }

  if (filePaths.length === 0) {
    console.error('No valid file paths found in files_list.txt (or all commented out/duplicates).');
    return;
  }

  console.log(`Processing ${filePaths.length} files...`);
  const results = await Promise.all(filePaths.map((fp) => getFileStatsAndContent(fp)));
  console.log(`Processing complete.`);

  let totalLines = 0;
  let totalCharacters = 0;
  let totalTokens = 0;
  let errorCount = 0;

  // Sum only for text-based files (images are 0/0/0 anyway)
  for (const res of results) {
    if (!res.error) {
      totalLines += res.lines;
      totalCharacters += res.characters;
      totalTokens += res.tokens;
    } else {
      errorCount++;
      console.warn(`Warning: Skipping stats for file due to error: ${res.filePath} - ${res.error}`);
    }
  }

  // Build final output
  let output = '';
  output += `<${OUTPUT_FILENAME}>\n`;
  output += `Total Files Processed: ${results.length}\n`;
  if (errorCount > 0) {
    output += `Files with Errors: ${errorCount}\n`;
  }
  output += `Total Lines (Text Files): ${totalLines}\n`;
  output += `Total Characters (Text Files): ${totalCharacters}\n`;
  output += `Total Tokens (Text Files): ${totalTokens}\n`;
  output += `---\n`;

  // Top 10 by token (filter out errors for sorting, but mention them)
  const validResults = results.filter(r => !r.error && !r.imageMetadata); // Only sort text files by tokens
  const top10 = validResults
    .slice()
    .sort((a, b) => b.tokens - a.tokens)
    .slice(0, 10);

  output += `<top 10 text files by tokens>\n`;
  if (top10.length === 0 && validResults.length > 0) {
       output += `(No text files with more than 0 tokens)\n`;
  } else if (top10.length === 0) {
       output += `(No valid text files found)\n`;
  }
  top10.forEach((r, i) => {
     output += `${i + 1}. ${path.relative(scriptDir, r.filePath)} - Lines: ${r.lines} - Characters: ${r.characters} - Tokens: ${r.tokens}\n`;
  });
  output += `</top 10 text files by tokens>\n`;
  output += `---\n`;

  // List each file
  output += `<files list>\n`;
  results.forEach((r, i) => {
    const n = i + 1;
    const relativePath = path.relative(scriptDir, r.filePath); // Show relative path for brevity
    if (r.error) {
      output += `${n}. ${relativePath} - ERROR: ${r.error}\n`;
    } else if (r.imageMetadata) {
       output += `${n}. ${relativePath} - [Image] Format: ${r.imageMetadata.format || 'Unknown'} - Size: ${r.imageMetadata.sizeInBytes >= 0 ? r.imageMetadata.sizeInBytes + ' bytes' : 'N/A'}${r.imageMetadata.width ? ` - ${r.imageMetadata.width}x${r.imageMetadata.height}` : ''}\n`;
    }
     else {
      output += `${n}. ${relativePath} - Lines: ${r.lines} - Characters: ${r.characters} - Tokens: ${r.tokens}\n`;
    }
  });
  output += `</files list>\n`;
  output += `---\n`;


  // Files content
  output += `<files content>\n`; // Changed tag name for clarity
  results.forEach((r) => {
    // Use relative paths in the output file tags as well
    const relativePath = path.relative(scriptDir, r.filePath).replace(/\\/g, '/'); // Normalize slashes
    output += `<file path="${relativePath}">\n`; // Using attribute style
    if (r.error) {
      output += `<!-- ERROR reading file: ${r.error} -->\n`;
    } else if (r.imageMetadata) {
      // It's an image
      output += `<metadata>\n`;
      // Clean up metadata output slightly
      const metadataToPrint = { ...r.imageMetadata };
      if (metadataToPrint.error) {
         // Error already noted above, maybe simplify here or remove duplicate info
         metadataToPrint.error = `Note: ${metadataToPrint.error}`;
      }
      output += JSON.stringify(metadataToPrint, null, 2) + '\n';
      output += `</metadata>\n`;
    } else {
      // It's text - wrap in CDATA if it might contain XML problematic chars
      // Although for simple text files, it's often fine without it.
      // Consider adding CDATA if you expect XML/HTML content often:
      // output += `<![CDATA[\n${r.content}\n]]>\n`;
      output += r.content; // Keep simple for now
      // Add a newline if content doesn't end with one, for cleaner separation
      if (r.content && !r.content.endsWith('\n')) {
         output += '\n';
      }
    }
    output += `</file>\n`; // Closing tag matches opening attribute style
  });
  output += `</files content>\n`;
  output += `</${OUTPUT_FILENAME}>\n`;

  // Write
  const outputFilePath = path.join(scriptDir, OUTPUT_FILENAME);
  try {
    await fs.writeFile(outputFilePath, output, 'utf-8');
    console.log(`\nFlattened repository saved to: ${outputFilePath}\n`);
    console.log('Summary:');
    console.log(`Total Files Processed: ${results.length}`);
    if (errorCount > 0) {
      console.log(`Files with Errors: ${errorCount}`);
    }
    console.log(`Total Lines (Text Files): ${totalLines}`);
    console.log(`Total Characters (Text Files): ${totalCharacters}`);
    console.log(`Total Tokens (Text Files): ${totalTokens}`);
  } catch (err) {
    console.error(`\nError writing to ${OUTPUT_FILENAME}:`, err.message);
  }
}

main().catch(err => {
    // Catch unhandled promise rejections from main
    console.error("\nAn unexpected error occurred:", err);
    process.exit(1); // Exit with error code
});
</flattenv2.js>
<flattenv5.js>
#!/usr/bin/env node
/**
 * flattenv6.js
 *
 * The definitive script for creating a flattened repository context file.
 * This version introduces intelligent, time-based PDF conversion and robust de-duplication.
 *
 * --- FEATURES ---
 * 1.  **Automated File List Management**: Intelligently updates `files_list.txt`.
 *     - New source files are appended.
 *     - Auto-generated .md files (from .pdf) are NOT added to the list.
 *     - Files no longer on disk are commented out.
 *
 * 2.  **Intelligent PDF-to-Markdown Conversion**:
 *     - Auto-generates `.md` from `.pdf` only if the `.md` doesn't exist OR if the `.pdf` is newer.
 *
 * 3.  **Advanced Commenting**:
 *     - Supports single-line (`#`) and multi-line (`###`) comments.
 *
 * 4.  **Robust De-duplication**: The root cause of duplication is solved by preventing generated files
 *     from being added to the manifest. The `.pdf` is the single source of truth.
 *
 * 5.  **Metadata Generation**: Includes comprehensive metadata in the final output.
 *
 * --- USAGE ---
 * 1.  Install dependencies: `npm install pdf-parse`
 * 2.  Run the script: `node flattenv6.js`
 */

// --- DEPENDENCIES ---
const fs = require('fs').promises;
const path = require('path');
let pdf;
try {
  pdf = require('pdf-parse');
} catch (e) {
  console.error("Error: The 'pdf-parse' package is required but not found.");
  console.error("Please run 'npm install pdf-parse' in your terminal and try again.");
  process.exit(1);
}

// --- CONFIGURATION ---
const CWD = process.cwd();
const TARGET_DIR = path.join(CWD, 'AWU');
const FILE_LIST_PATH = path.join(CWD, 'files_list.txt');
const FLATTENED_OUTPUT_PATH = path.join(CWD, 'flattened_repo.txt');
const IGNORED_DIRS = new Set(['.git', 'node_modules', '.next']);
const IMAGE_EXTS = new Set(['.ico', '.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg', '.webp']);

async function getAllFiles(dir) {
    let results = [];
    const list = await fs.readdir(dir, { withFileTypes: true });
    for (const dirent of list) {
        const fullPath = path.join(dir, dirent.name);
        if (dirent.isDirectory()) {
            if (!IGNORED_DIRS.has(dirent.name)) {
                results = results.concat(await getAllFiles(fullPath));
            }
        } else {
            results.push(fullPath);
        }
    }
    return results;
}

async function updateFileList() {
    console.log(`Scanning directory: ${TARGET_DIR}`);
    const diskFiles = new Set(await getAllFiles(TARGET_DIR));
    const diskFilesRelative = new Set(Array.from(diskFiles).map(f => path.relative(CWD, f)));

    let existingLines = [];
    let activeFilesFromList = new Set();

    try {
        const fileListContent = await fs.readFile(FILE_LIST_PATH, 'utf-8');
        existingLines = fileListContent.split(/\r?\n/);
    } catch (e) {
        if (e.code !== 'ENOENT') throw e;
        console.log(`'${path.basename(FILE_LIST_PATH)}' not found. Creating a new one.`);
    }

    const newLines = [];
    const processedFiles = new Set();
    let inMultiLineComment = false;

    for (const line of existingLines) {
        const trimmedLine = line.trim();
        if (trimmedLine === '###') {
            inMultiLineComment = !inMultiLineComment;
            newLines.push(line);
            continue;
        }

        if (inMultiLineComment || trimmedLine.startsWith('#')) {
            newLines.push(line);
            const pathMatch = trimmedLine.match(/^#\s*DELETED:\s*(.*)/) || trimmedLine.match(/^#\s*(.*)/);
            if (pathMatch && pathMatch[1]) {
                processedFiles.add(pathMatch[1].trim());
            }
            continue;
        }

        if (trimmedLine) {
            const filePath = trimmedLine;
            if (diskFilesRelative.has(filePath)) {
                newLines.push(filePath);
                activeFilesFromList.add(path.resolve(CWD, filePath));
            } else {
                console.log(`File removed from disk: ${filePath}. Commenting out.`);
                newLines.push(`# DELETED: ${filePath}`);
            }
            processedFiles.add(filePath);
        } else {
             newLines.push(line);
        }
    }

    let newFilesAdded = 0;
    for (const diskFile of diskFiles) {
        const relativePath = path.relative(CWD, diskFile);
        if (processedFiles.has(relativePath)) continue;

        if (relativePath.toLowerCase().endsWith('.md')) {
            const potentialPdfPath = relativePath.replace(/\.md$/i, '.pdf');
            if (diskFilesRelative.has(potentialPdfPath)) {
                console.log(`Ignoring auto-generated file: '${relativePath}' as its source '${potentialPdfPath}' exists.`);
                continue;
            }
        }

        console.log(`New file found: ${relativePath}. Adding to list.`);
        newLines.push(relativePath);
        activeFilesFromList.add(diskFile);
        newFilesAdded++;
    }

    if (newFilesAdded > 0) {
        console.log(`${newFilesAdded} new file(s) added to '${path.basename(FILE_LIST_PATH)}'.`);
    }

    await fs.writeFile(FILE_LIST_PATH, newLines.join('\n'), 'utf-8');
    console.log(`'${path.basename(FILE_LIST_PATH)}' has been updated.`);

    return Array.from(activeFilesFromList);
}

async function convertPdfToMd(pdfPath) {
    const mdPath = pdfPath.replace(/\.pdf$/i, '.md');
    try {
        let mdExists = true;
        let pdfStats, mdStats;
        
        try {
            pdfStats = await fs.stat(pdfPath);
            mdStats = await fs.stat(mdPath);
        } catch (e) {
            if (e.code === 'ENOENT') {
                mdExists = false;
            } else {
                throw e; 
            }
        }

        if (!mdExists || pdfStats.mtime > mdStats.mtime) {
            console.log(`Converting PDF to MD: ${path.basename(pdfPath)}...`);
            const buffer = await fs.readFile(pdfPath);
            const data = await pdf(buffer);
            const mdContent = `<!-- This file was auto-generated from ${path.basename(pdfPath)} -->\n\n${data.text}`;
            await fs.writeFile(mdPath, mdContent, 'utf-8');
            console.log(`Successfully created/updated ${path.basename(mdPath)}.`);
        }
        return mdPath;
    } catch (error) {
        console.warn(`Could not convert PDF '${path.basename(pdfPath)}'. Error: ${error.message}`);
        const errorContent = `<!-- FAILED to auto-generate from ${path.basename(pdfPath)}. Error: ${error.message} -->`;
        await fs.writeFile(mdPath, errorContent, 'utf-8');
        return mdPath; // Return path even on failure, so it can be marked as errored.
    }
}

async function processFile(filePath) {
    const fileExt = path.extname(filePath).toLowerCase();
    let stats = { filePath, lines: 0, characters: 0, tokens: 0, content: null, imageMetadata: null, error: null };

    try {
        if (IMAGE_EXTS.has(fileExt)) {
            const fileStats = await fs.stat(filePath);
            stats.imageMetadata = { format: fileExt.toUpperCase().slice(1), sizeInBytes: fileStats.size };
        } else {
            const content = await fs.readFile(filePath, 'utf-8');
            stats.content = content;
            stats.lines = content.split('\n').length;
            stats.characters = content.length;
            stats.tokens = Math.ceil(content.length / 4);
        }
    } catch (error) {
        stats.error = error.message;
        console.warn(`Skipping file due to error: ${path.basename(filePath)} - ${error.message}`);
    }
    return stats;
}


async function generateFlattenedFile(filePaths) {
    console.log("Generating flattened repository file...");
    const processedFiles = [];
    const handledMdFiles = new Set(); // Keep track of MDs handled via PDFs

    // First pass: Handle PDFs and their corresponding MDs
    for (const filePath of filePaths) {
        if (filePath.toLowerCase().endsWith('.pdf')) {
            const mdPath = await convertPdfToMd(filePath);
            const mdStats = await processFile(mdPath);
            processedFiles.push(mdStats);
            handledMdFiles.add(mdPath);
        }
    }

    // Second pass: Handle all other files, skipping MDs that were already handled
    for (const filePath of filePaths) {
        if (filePath.toLowerCase().endsWith('.pdf')) continue; // Already handled
        if (handledMdFiles.has(filePath)) continue; // Already handled via its PDF
        
        const fileStats = await processFile(filePath);
        processedFiles.push(fileStats);
    }

    // Sort processed files alphabetically for consistent output
    processedFiles.sort((a, b) => a.filePath.localeCompare(b.filePath));

    let totalLines = 0, totalCharacters = 0, totalTokens = 0, errorCount = 0;
    processedFiles.forEach(file => {
        if (!file.error) {
            totalLines += file.lines;
            totalCharacters += file.characters;
            totalTokens += file.tokens;
        } else { errorCount++; }
    });

    const textFiles = processedFiles.filter(f => !f.error && f.content !== null);
    const top10 = [...textFiles].sort((a, b) => b.tokens - a.tokens).slice(0, 10);

    let output = `<flattened_repo.txt>\n`;
    output += `Total Files Processed: ${processedFiles.length}\n`;
    if (errorCount > 0) output += `Files with Errors: ${errorCount}\n`;
    output += `Total Lines (Text Files): ${totalLines}\n`;
    output += `Total Characters (Text Files): ${totalCharacters}\n`;
    output += `Total Tokens (Text Files): ${totalTokens}\n\n`;

    output += `<top 10 text files by tokens>\n`;
    top10.forEach((file, i) => {
        output += `${i + 1}. ${path.relative(CWD, file.filePath)} - Tokens: ${file.tokens}\n`;
    });
    output += `</top 10 text files by tokens>\n\n`;

    output += `<files list>\n`;
    processedFiles.forEach((file, i) => {
        const relPath = path.relative(CWD, file.filePath);
        if (file.error) {
            output += `${i + 1}. ${relPath} - ERROR: ${file.error}\n`;
        } else if (file.imageMetadata) {
            output += `${i + 1}. ${relPath} - [Image] Size: ${file.imageMetadata.sizeInBytes} bytes\n`;
        } else {
            output += `${i + 1}. ${relPath} - Lines: ${file.lines}, Chars: ${file.characters}, Tokens: ${file.tokens}\n`;
        }
    });
    output += `</files list>\n\n`;

    output += `<files content>\n`;
    processedFiles.forEach(file => {
        const relPath = path.relative(CWD, file.filePath).replace(/\\/g, '/');
        output += `<file path="${relPath}">\n`;
        if (file.error) {
            output += `<!-- ERROR reading file: ${file.error} -->\n`;
        } else if (file.imageMetadata) {
            output += `<metadata>\n${JSON.stringify(file.imageMetadata, null, 2)}\n</metadata>\n`;
        } else {
            output += file.content;
            if (file.content && !file.content.endsWith('\n')) {
                output += '\n';
            }
        }
        output += `</file>\n`;
    });
    output += `</files content>\n`;
    output += `</<flattened_repo.txt>\n`;

    await fs.writeFile(FLATTENED_OUTPUT_PATH, output, 'utf-8');
    console.log(`\n✅ Flattened repository saved to: ${FLATTENED_OUTPUT_PATH}`);
    console.log(`   - Total Files: ${processedFiles.length}`);
    console.log(`   - Total Tokens: ${totalTokens}`);
}

async function main() {
    console.log('--- Starting Flatten Script v6 ---');
    if (!pdf) return;

    const activeFilePaths = await updateFileList();
    if (activeFilePaths.length === 0) {
        console.log("No active files to process. Exiting.");
        return;
    }

    console.log(`\nProcessing ${activeFilePaths.length} unique file entries...`);
    await generateFlattenedFile(activeFilePaths);
    console.log('--- Script finished successfully ---');
}

main().catch(err => {
    console.error('\n--- A critical error occurred! ---');
    console.error(err);
    process.exit(1);
});
</flattenv5.js>
<flatten_docs.js>
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const MASTER_LIST_FILE = './docs/A0. Master Artifact List.md';
const DOCS_DIR = 'docs';
const OUTPUT_FILE = 'flattened_repo.txt';

/**
 * Sanitizes an artifact name from the master list to make it a valid filename.
 * @param {string} name The original artifact name.
 * @returns {string} A sanitized filename without the extension.
 */
function sanitizeFilename(name) {
  return name
    .replace(/\s*->\s*/g, ' - ')
    .replace(/\//g, '_')
    .replace(/:/g, '-')
    .replace(/[<>:"/\\|?*]/g, '')
    .trim();
}

/**
 * Main function to read the master list, find doc files, and flatten them.
 */
async function flattenDocumentation() {
  console.log(`Starting documentation flattening process...`);
  console.log(`Reading master list from: ${MASTER_LIST_FILE}`);

  let masterListContent;
  try {
    masterListContent = fs.readFileSync(MASTER_LIST_FILE, 'utf-8');
  } catch (error) {
    console.error(`Error: Could not read ${MASTER_LIST_FILE}. Make sure it exists.`);
    process.exit(1);
  }

  const lines = masterListContent.split('\n');
  const artifactsToProcess = [];
  let currentArtifactName = null;

  console.log('Parsing master artifact list...');
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('###')) {
      // This is an artifact entry line
      currentArtifactName = trimmedLine.substring(3).trim();
      // Exclude script-only artifacts
      if (!currentArtifactName.startsWith('@@')) {
        artifactsToProcess.push(currentArtifactName);
      }
    }
  }

  if (artifactsToProcess.length === 0) {
    console.log('No artifacts found to include in the flattened file.');
    return;
  }

  console.log(`Found ${artifactsToProcess.length} artifacts to process for flattening.`);

  const fileStats = [];
  let totalLines = 0;
  let totalChars = 0;
  let totalTokens = 0;

  for (const fullName of artifactsToProcess) {
    const sanitizedName = sanitizeFilename(fullName.replace(/^!!\s*/, ''));
    const mdFilename = `${sanitizedName}.md`;
    const filePath = path.join(DOCS_DIR, mdFilename);

    try {
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const lines = fileContent.split('\n').length;
        const characters = fileContent.length;
        const tokens = Math.ceil(characters / 4);

        fileStats.push({
          fullName,
          content: fileContent,
          lines,
          characters,
          tokens
        });

        totalLines += lines;
        totalChars += characters;
        totalTokens += tokens;
        console.log(`  [OK] Processed: ${fullName}`);
      } else {
        console.warn(`  [WARN] File not found for artifact: ${fullName} (Expected: ${filePath})`);
      }
    } catch (error) {
      console.error(`Failed to read or process file: ${filePath}`, error);
    }
  }

  // --- Build Metadata Header ---
  let outputContent = `<${OUTPUT_FILE}>\n`;
  outputContent += `Total Files Processed: ${fileStats.length}\n`;
  outputContent += `Total Lines (Text Files): ${totalLines}\n`;
  outputContent += `Total Characters (Text Files): ${totalChars}\n`;
  outputContent += `Total Tokens (Text Files): ${totalTokens}\n`;
  outputContent += `---\n`;

  // Top 10 by tokens
  const top10 = [...fileStats].sort((a, b) => b.tokens - a.tokens).slice(0, 10);
  outputContent += `<top 10 text files by tokens>\n`;
  top10.forEach((stat, i) => {
    outputContent += `${i + 1}. ${stat.fullName} - Lines: ${stat.lines} - Characters: ${stat.characters} - Tokens: ${stat.tokens}\n`;
  });
  outputContent += `</top 10 text files by tokens>\n`;
  outputContent += `---\n`;

  // Full file list
  outputContent += `<files list>\n`;
  fileStats.forEach((stat, i) => {
    outputContent += `${i + 1}. ${stat.fullName} - Lines: ${stat.lines} - Characters: ${stat.characters} - Tokens: ${stat.tokens}\n`;
  });
  outputContent += `</files list>\n---\n`;

  // --- Append File Contents ---
  outputContent += `<files content>\n`;
  for (const stat of fileStats) {
    outputContent += `<${stat.fullName}>\n`;
    outputContent += stat.content;
    outputContent += `\n</${stat.fullName}>\n\n`;
  }
  outputContent += `</files content>\n`;
  outputContent += `</${OUTPUT_FILE}>\n`;

  try {
    fs.writeFileSync(OUTPUT_FILE, outputContent, 'utf-8');
    console.log(`\nProcess complete. Flattened ${fileStats.length} artifacts into ./${OUTPUT_FILE}`);
  } catch (error) {
    console.error(`Failed to write output file: ${OUTPUT_FILE}`, error);
  }
}

flattenDocumentation();
</flatten_docs.js>
<flattened_repo.txt>
<flattened_repo.txt>
Total Files Processed: 56
Total Lines (Text Files): 53167
Total Characters (Text Files): 3454475
Total Tokens (Text Files): 863638
---
<top 10 text files by tokens>
1. !!A65. flattened_repo_ai-ascent.txt - Lines: 44895 - Characters: 2687765 - Tokens: 671942
2. !!A172. Flattened Report Repo - Lines: 3363 - Characters: 450675 - Tokens: 112669
[...]
9. A35. Initial Project Structure - Lines: 260 - Characters: 9564 - Tokens: 2391
10. A84. V1.0 Product Blueprint Table - Lines: 72 - Characters: 9317 - Tokens: 2330
</top 10 text files by tokens>
---
<files list>
1. A1. Startup Company Gameplay Loops -> AI Ascent Gameplay Loops - Lines: 54 - Characters: 7440 - Tokens: 1860
2. A2. Server and Hardware Loop - Lines: 40 - Characters: 7907 - Tokens: 1977
[...]
55. !!A187. UKI CTO Meeting Briefing - Lines: 117 - Characters: 10186 - Tokens: 2547
56. !!A65. flattened_repo_ai-ascent.txt - Lines: 44895 - Characters: 2687765 - Tokens: 671942
</files list>
---
<files content>
<A1. Startup Company Gameplay Loops -> AI Ascent Gameplay Loops>
// 1. Startup Company Gameplay Loops -> AI Ascent Gameplay Loops
// Updated on: C1253 (Reflect working PvP battles as a core progression path.)
// Updated on: C1211 (Incorporate new LLM-based interaction loops.)

**Core Gameplay Shift:** The central product is the **Trained Model Artifact**. Goals focus on maximizing relevant metrics like **Benchmark Rank**, **Product Growth Metrics (ELO, `userCount`, `tokensPerSecond`)**, or overall **Company Valuation**. Each player selects a Founder character at the start, which grants unique bonuses to their primary tasks. The player's Founder is represented by an **Avatar** in a shared, persistent 2D world. NPC co-founders are removed; other characters in the world are other live players. **Game state is automatically persisted.** **Unhappy employees take mandatory Vacations (PTO).** **Employee level increases productivity (+10% per level, XP gain balanced).** **Employees gain passive XP while assigned but blocked.** **Compute state persists.** **Task assignments and progress persist across game sessions.** **ML Engineer and AI Researcher roles are hirable from the start (Phase 0).**

**Phase 0: The "Garage" Days (Game Start - See A102)**
[...]
</flattened_repo.txt>


</Cycles>

asdf



<!--
  File: flattened_repo.md
  Source Directory: C:\Projects\DCE
  Date Generated: 2025-08-17T14:50:00.871Z
  ---
  Total Files: 153
  Total Lines: 12490
  Total Characters: 467243
  Approx. Tokens: 116870
-->

<!-- Top 10 Files by Token Count -->
1. src\Artifacts\A6. DCE - Initial Scaffolding Deployment Script.md (10923 tokens)
2. deploy_scaffold.js (10600 tokens)
3. The-Creator-AI-main\src\common\constants\agents.constants.ts (9159 tokens)
4. src\backend\services\fs.service.ts (2676 tokens)
5. The-Creator-AI-main\src\backend\services\code.service.ts (2618 tokens)
6. The-Creator-AI-main\src\backend\services\fs.service.ts (2495 tokens)
7. The-Creator-AI-main\src\client\views\change-plan.view\on-mesage.ts (2424 tokens)
8. The-Creator-AI-main\src\backend\services\llm.service.ts (2156 tokens)
9. src\client\views\context-chooser.view\view.tsx (1935 tokens)
10. src\backend\services\flattener.service.ts (1711 tokens)

<!-- Full File List -->
1. .gitignore - Lines: 9 - Chars: 108 - Tokens: 27
2. .vscodeignore - Lines: 7 - Chars: 76 - Tokens: 19
3. bootstrap-flattener.js - Lines: 185 - Chars: 5834 - Tokens: 1459
4. deploy_scaffold.js - Lines: 1259 - Chars: 42400 - Tokens: 10600
5. package.json - Lines: 72 - Chars: 2163 - Tokens: 541
6. public\spiral.svg - Lines: 8 - Chars: 459 - Tokens: 115
7. src\Artifacts\A0. DCE Master Artifact List.md - Lines: 82 - Chars: 5172 - Tokens: 1293
8. src\Artifacts\A1. DCE - Project Vision and Goals.md - Lines: 38 - Chars: 3311 - Tokens: 828
9. src\Artifacts\A10. DCE - Metadata and Statistics Display.md - Lines: 47 - Chars: 5207 - Tokens: 1302
10. src\Artifacts\A11. DCE - Regression Case Studies.md - Lines: 73 - Chars: 5105 - Tokens: 1277
11. src\Artifacts\A12. DCE - Logging and Debugging Guide.md - Lines: 68 - Chars: 4497 - Tokens: 1125
12. src\Artifacts\A13. DCE - Phase 1 - Right-Click Context Menu.md - Lines: 48 - Chars: 5680 - Tokens: 1420
13. src\Artifacts\A14. DCE - Ongoing Development Issues.md - Lines: 52 - Chars: 3992 - Tokens: 998
14. src\Artifacts\A189. Number Formatting Reference Guide.md - Lines: 118 - Chars: 4938 - Tokens: 1235
15. src\Artifacts\A2. DCE - Phase 1 - Context Chooser - Requirements & Design.md - Lines: 31 - Chars: 4278 - Tokens: 1070
16. src\Artifacts\A3. DCE - Technical Scaffolding Plan.md - Lines: 55 - Chars: 3684 - Tokens: 921
17. src\Artifacts\A4. DCE - Analysis of The-Creator-AI Repo.md - Lines: 56 - Chars: 5722 - Tokens: 1431
18. src\Artifacts\A5. DCE - Target File Structure.md - Lines: 67 - Chars: 1977 - Tokens: 495
19. src\Artifacts\A6. DCE - Initial Scaffolding Deployment Script.md - Lines: 1282 - Chars: 43689 - Tokens: 10923
20. src\Artifacts\A7. DCE - Development and Testing Guide.md - Lines: 47 - Chars: 3075 - Tokens: 769
21. src\Artifacts\A8. DCE - Phase 1 - Selection Sets Feature Plan.md - Lines: 74 - Chars: 5773 - Tokens: 1444
22. src\Artifacts\A9. DCE - GitHub Repository Setup Guide.md - Lines: 71 - Chars: 3094 - Tokens: 774
23. src\backend\commands\commands.ts - Lines: 85 - Chars: 3614 - Tokens: 904
24. src\backend\commands\register-commands.ts - Lines: 11 - Chars: 456 - Tokens: 114
25. src\backend\services\flattener.service.ts - Lines: 170 - Chars: 6841 - Tokens: 1711
26. src\backend\services\fs.service.ts - Lines: 258 - Chars: 10703 - Tokens: 2676
27. src\backend\services\logger.service.ts - Lines: 38 - Chars: 1115 - Tokens: 279
28. src\backend\services\selection.service.ts - Lines: 39 - Chars: 1300 - Tokens: 325
29. src\backend\services\services.ts - Lines: 22 - Chars: 844 - Tokens: 211
30. src\client\components\Checkbox.tsx - Lines: 25 - Chars: 814 - Tokens: 204
31. src\client\components\ContextMenu.tsx - Lines: 61 - Chars: 2914 - Tokens: 729
32. src\client\components\file-tree\FileTree.tsx - Lines: 119 - Chars: 5469 - Tokens: 1368
33. src\client\components\file-tree\FileTree.utils.ts - Lines: 101 - Chars: 3541 - Tokens: 886
34. src\client\components\SelectedFilesView.tsx - Lines: 118 - Chars: 5070 - Tokens: 1268
35. src\client\components\tree-view\TreeView.tsx - Lines: 90 - Chars: 3217 - Tokens: 805
36. src\client\components\tree-view\TreeView.utils.ts - Lines: 13 - Chars: 333 - Tokens: 84
37. src\client\utils\logger.ts - Lines: 19 - Chars: 762 - Tokens: 191
38. src\client\views\context-chooser.view\index.ts - Lines: 7 - Chars: 184 - Tokens: 46
39. src\client\views\context-chooser.view\on-message.ts - Lines: 60 - Chars: 2269 - Tokens: 568
40. src\client\views\context-chooser.view\view.scss - Lines: 320 - Chars: 6747 - Tokens: 1687
41. src\client\views\context-chooser.view\view.tsx - Lines: 178 - Chars: 7739 - Tokens: 1935
42. src\client\views\index.ts - Lines: 34 - Chars: 1604 - Tokens: 401
43. src\common\ipc\channels.enum.ts - Lines: 21 - Chars: 1013 - Tokens: 254
44. src\common\ipc\channels.type.ts - Lines: 22 - Chars: 1453 - Tokens: 364
45. src\common\ipc\client-ipc.ts - Lines: 38 - Chars: 1385 - Tokens: 347
46. src\common\ipc\get-vscode-api.ts - Lines: 12 - Chars: 239 - Tokens: 60
47. src\common\ipc\server-ipc.ts - Lines: 42 - Chars: 1562 - Tokens: 391
48. src\common\types\file-node.ts - Lines: 9 - Chars: 276 - Tokens: 69
49. src\common\types\vscode-webview.d.ts - Lines: 9 - Chars: 282 - Tokens: 71
50. src\common\utils\formatting.ts - Lines: 81 - Chars: 2716 - Tokens: 679
51. src\common\utils\view-html.ts - Lines: 26 - Chars: 971 - Tokens: 243
52. src\common\view-types.ts - Lines: 8 - Chars: 246 - Tokens: 62
53. src\extension.ts - Lines: 52 - Chars: 2001 - Tokens: 501
54. The-Creator-AI-main\.eslintrc.json - Lines: 30 - Chars: 662 - Tokens: 166
55. The-Creator-AI-main\.gitignore - Lines: 8 - Chars: 75 - Tokens: 19
56. The-Creator-AI-main\.vscode-test.mjs - Lines: 6 - Chars: 117 - Tokens: 30
57. The-Creator-AI-main\.vscodeignore - Lines: 15 - Chars: 192 - Tokens: 48
58. The-Creator-AI-main\CHANGELOG.md - Lines: 9 - Chars: 241 - Tokens: 61
59. The-Creator-AI-main\LICENSE - Lines: 22 - Chars: 1069 - Tokens: 268
60. The-Creator-AI-main\Notes.md - Lines: 2 - Chars: 67 - Tokens: 17
61. The-Creator-AI-main\package.json - Lines: 181 - Chars: 5082 - Tokens: 1271
62. The-Creator-AI-main\postcss.config.js - Lines: 7 - Chars: 82 - Tokens: 21
63. The-Creator-AI-main\public\main.css - Lines: 40 - Chars: 559 - Tokens: 140
64. The-Creator-AI-main\public\reset.css - Lines: 30 - Chars: 233 - Tokens: 59
65. The-Creator-AI-main\public\spiral.svg - Lines: 17 - Chars: 579 - Tokens: 145
66. The-Creator-AI-main\public\vscode.css - Lines: 91 - Chars: 1977 - Tokens: 495
67. The-Creator-AI-main\README.md - Lines: 44 - Chars: 1614 - Tokens: 404
68. The-Creator-AI-main\src\backend\commands\commands.ts - Lines: 138 - Chars: 4691 - Tokens: 1173
69. The-Creator-AI-main\src\backend\commands\register-commands.ts - Lines: 11 - Chars: 382 - Tokens: 96
70. The-Creator-AI-main\src\backend\repositories\chat.respository.ts - Lines: 142 - Chars: 3906 - Tokens: 977
71. The-Creator-AI-main\src\backend\repositories\persistent-store.repository.ts - Lines: 28 - Chars: 897 - Tokens: 225
72. The-Creator-AI-main\src\backend\repositories\settings.repository.ts - Lines: 62 - Chars: 1694 - Tokens: 424
73. The-Creator-AI-main\src\backend\services\code.service.ts - Lines: 344 - Chars: 10472 - Tokens: 2618
74. The-Creator-AI-main\src\backend\services\fs.service.ts - Lines: 323 - Chars: 9979 - Tokens: 2495
75. The-Creator-AI-main\src\backend\services\git.service.ts - Lines: 41 - Chars: 1411 - Tokens: 353
76. The-Creator-AI-main\src\backend\services\llm.service.ts - Lines: 264 - Chars: 8622 - Tokens: 2156
77. The-Creator-AI-main\src\backend\services\logger.service.ts - Lines: 55 - Chars: 1371 - Tokens: 343
78. The-Creator-AI-main\src\backend\services\message.service.ts - Lines: 58 - Chars: 1661 - Tokens: 416
79. The-Creator-AI-main\src\backend\services\plan-exim.service.ts - Lines: 114 - Chars: 4560 - Tokens: 1140
80. The-Creator-AI-main\src\backend\services\services.ts - Lines: 67 - Chars: 1964 - Tokens: 491
81. The-Creator-AI-main\src\backend\services\task-queue.service.ts - Lines: 128 - Chars: 3921 - Tokens: 981
82. The-Creator-AI-main\src\backend\types\llm-service.enum.ts - Lines: 6 - Chars: 94 - Tokens: 24
83. The-Creator-AI-main\src\backend\types\storage-keys.enum.ts - Lines: 6 - Chars: 202 - Tokens: 51
84. The-Creator-AI-main\src\backend\utils\handleActiveTabChange.ts - Lines: 26 - Chars: 775 - Tokens: 194
85. The-Creator-AI-main\src\backend\utils\mergeOpenEditorsWithSelectedFiles.ts - Lines: 33 - Chars: 952 - Tokens: 238
86. The-Creator-AI-main\src\backend\utils\remoteSetChangePlanViewState.ts - Lines: 26 - Chars: 989 - Tokens: 248
87. The-Creator-AI-main\src\client\components\AutoResizingTextarea.tsx - Lines: 49 - Chars: 2000 - Tokens: 500
88. The-Creator-AI-main\src\client\components\Checkbox.tsx - Lines: 26 - Chars: 815 - Tokens: 204
89. The-Creator-AI-main\src\client\components\ErrorBoundary.tsx - Lines: 44 - Chars: 1220 - Tokens: 305
90. The-Creator-AI-main\src\client\components\file-tree\FileTree.scss - Lines: 9 - Chars: 157 - Tokens: 40
91. The-Creator-AI-main\src\client\components\file-tree\FileTree.tsx - Lines: 137 - Chars: 4398 - Tokens: 1100
92. The-Creator-AI-main\src\client\components\file-tree\FileTree.utils.ts - Lines: 68 - Chars: 2214 - Tokens: 554
93. The-Creator-AI-main\src\client\components\Modal.tsx - Lines: 91 - Chars: 2649 - Tokens: 663
94. The-Creator-AI-main\src\client\components\ProgressSteps.tsx - Lines: 59 - Chars: 1648 - Tokens: 412
95. The-Creator-AI-main\src\client\components\tree-view\TreeView.tsx - Lines: 84 - Chars: 2738 - Tokens: 685
96. The-Creator-AI-main\src\client\components\tree-view\TreeView.utils.ts - Lines: 14 - Chars: 316 - Tokens: 79
97. The-Creator-AI-main\src\client\modules\api-keys-management.module\ApiKeysManagement.tsx - Lines: 150 - Chars: 6318 - Tokens: 1580
98. The-Creator-AI-main\src\client\modules\commit.module\Commit.tsx - Lines: 63 - Chars: 3218 - Tokens: 805
99. The-Creator-AI-main\src\client\modules\context.module\Context.tsx - Lines: 87 - Chars: 4052 - Tokens: 1013
100. The-Creator-AI-main\src\client\modules\plan.module\components\file-card.tsx - Lines: 93 - Chars: 4112 - Tokens: 1028
101. The-Creator-AI-main\src\client\modules\plan.module\formatted-plan-preview.tsx - Lines: 172 - Chars: 6480 - Tokens: 1620
102. The-Creator-AI-main\src\client\modules\plan.module\plan-input-box.tsx - Lines: 139 - Chars: 6410 - Tokens: 1603
103. The-Creator-AI-main\src\client\modules\plan.module\Plan.tsx - Lines: 55 - Chars: 1749 - Tokens: 438
104. The-Creator-AI-main\src\client\store\store.ts - Lines: 20 - Chars: 479 - Tokens: 120
105. The-Creator-AI-main\src\client\store\useStore.ts - Lines: 26 - Chars: 627 - Tokens: 157
106. The-Creator-AI-main\src\client\views\change-plan.view\index.ts - Lines: 9 - Chars: 221 - Tokens: 56
107. The-Creator-AI-main\src\client\views\change-plan.view\logic\commitStagedChanges.ts - Lines: 11 - Chars: 385 - Tokens: 97
108. The-Creator-AI-main\src\client\views\change-plan.view\logic\getSelectedFiles.ts - Lines: 37 - Chars: 1294 - Tokens: 324
109. The-Creator-AI-main\src\client\views\change-plan.view\logic\handleCommitMessageSuggestions.ts - Lines: 15 - Chars: 580 - Tokens: 145
110. The-Creator-AI-main\src\client\views\change-plan.view\logic\handleFileClick.ts - Lines: 24 - Chars: 665 - Tokens: 167
111. The-Creator-AI-main\src\client\views\change-plan.view\logic\handleSubmitPlanRequest.ts - Lines: 79 - Chars: 2463 - Tokens: 616
112. The-Creator-AI-main\src\client\views\change-plan.view\logic\requestCommitMessageSuggestions.ts - Lines: 15 - Chars: 511 - Tokens: 128
113. The-Creator-AI-main\src\client\views\change-plan.view\logic\setupChannelHandlers.ts - Lines: 102 - Chars: 3069 - Tokens: 768
114. The-Creator-AI-main\src\client\views\change-plan.view\logic\updateOrCreateChangePlan.ts - Lines: 51 - Chars: 1633 - Tokens: 409
115. The-Creator-AI-main\src\client\views\change-plan.view\on-mesage.ts - Lines: 271 - Chars: 9696 - Tokens: 2424
116. The-Creator-AI-main\src\client\views\change-plan.view\store\change-plan-view.initial-state.ts - Lines: 17 - Chars: 453 - Tokens: 114
117. The-Creator-AI-main\src\client\views\change-plan.view\store\change-plan-view.logic.ts - Lines: 54 - Chars: 1617 - Tokens: 405
118. The-Creator-AI-main\src\client\views\change-plan.view\store\change-plan-view.state-type.ts - Lines: 34 - Chars: 843 - Tokens: 211
119. The-Creator-AI-main\src\client\views\change-plan.view\store\change-plan-view.store.ts - Lines: 18 - Chars: 672 - Tokens: 168
120. The-Creator-AI-main\src\client\views\change-plan.view\view.constants.ts - Lines: 6 - Chars: 134 - Tokens: 34
121. The-Creator-AI-main\src\client\views\change-plan.view\view.scss - Lines: 10 - Chars: 160 - Tokens: 40
122. The-Creator-AI-main\src\client\views\change-plan.view\view.tsx - Lines: 91 - Chars: 2823 - Tokens: 706
123. The-Creator-AI-main\src\client\views\chat.view\index.ts - Lines: 9 - Chars: 208 - Tokens: 52
124. The-Creator-AI-main\src\client\views\chat.view\on-mesage.ts - Lines: 50 - Chars: 1545 - Tokens: 387
125. The-Creator-AI-main\src\client\views\chat.view\view.scss - Lines: 10 - Chars: 160 - Tokens: 40
126. The-Creator-AI-main\src\client\views\chat.view\view.tsx - Lines: 71 - Chars: 2614 - Tokens: 654
127. The-Creator-AI-main\src\client\views\file-explorer.view\index.ts - Lines: 9 - Chars: 225 - Tokens: 57
128. The-Creator-AI-main\src\client\views\file-explorer.view\on-mesage.ts - Lines: 49 - Chars: 1773 - Tokens: 444
129. The-Creator-AI-main\src\client\views\file-explorer.view\view.scss - Lines: 10 - Chars: 160 - Tokens: 40
130. The-Creator-AI-main\src\client\views\file-explorer.view\view.tsx - Lines: 62 - Chars: 2265 - Tokens: 567
131. The-Creator-AI-main\src\client\views\index.ts - Lines: 54 - Chars: 1714 - Tokens: 429
132. The-Creator-AI-main\src\common\constants\agents.constants.ts - Lines: 837 - Chars: 36635 - Tokens: 9159
133. The-Creator-AI-main\src\common\firebase.ts - Lines: 22 - Chars: 874 - Tokens: 219
134. The-Creator-AI-main\src\common\ipc\channels.enum.ts - Lines: 37 - Chars: 1831 - Tokens: 458
135. The-Creator-AI-main\src\common\ipc\channels.type.ts - Lines: 125 - Chars: 3933 - Tokens: 984
136. The-Creator-AI-main\src\common\ipc\client-ipc.ts - Lines: 42 - Chars: 1338 - Tokens: 335
137. The-Creator-AI-main\src\common\ipc\get-vscode-api.ts - Lines: 12 - Chars: 239 - Tokens: 60
138. The-Creator-AI-main\src\common\ipc\server-ipc.ts - Lines: 44 - Chars: 1522 - Tokens: 381
139. The-Creator-AI-main\src\common\types\file-node.ts - Lines: 6 - Chars: 96 - Tokens: 24
140. The-Creator-AI-main\src\common\types\vscode-webview.d.ts - Lines: 49 - Chars: 1607 - Tokens: 402
141. The-Creator-AI-main\src\common\utils\firebaseLogger.ts - Lines: 43 - Chars: 1108 - Tokens: 277
142. The-Creator-AI-main\src\common\utils\key-path.ts - Lines: 43 - Chars: 1036 - Tokens: 259
143. The-Creator-AI-main\src\common\utils\parse-json.ts - Lines: 20 - Chars: 515 - Tokens: 129
144. The-Creator-AI-main\src\common\utils\view-html.ts - Lines: 35 - Chars: 1271 - Tokens: 318
145. The-Creator-AI-main\src\common\view-types.ts - Lines: 8 - Chars: 184 - Tokens: 46
146. The-Creator-AI-main\src\extension.ts - Lines: 24 - Chars: 623 - Tokens: 156
147. The-Creator-AI-main\src\test\extension.test.ts - Lines: 16 - Chars: 459 - Tokens: 115
148. The-Creator-AI-main\tailwind.config.js - Lines: 102 - Chars: 6814 - Tokens: 1704
149. The-Creator-AI-main\tsconfig.json - Lines: 31 - Chars: 814 - Tokens: 204
150. The-Creator-AI-main\vsc-extension-quickstart.md - Lines: 49 - Chars: 2893 - Tokens: 724
151. The-Creator-AI-main\webpack.config.js - Lines: 98 - Chars: 2795 - Tokens: 699
152. tsconfig.json - Lines: 19 - Chars: 457 - Tokens: 115
153. webpack.config.js - Lines: 63 - Chars: 1710 - Tokens: 428

<file path=".gitignore">
node_modules
package-lock.json
dist
out
*.vsix
.vscode-test/
.vscode/
The-Creator-AI-main/
prompt.md
</file>

<file path=".vscodeignore">
node_modules
src
.gitignore
webpack.config.js
tsconfig.json
**/*.map
**/*.ts
</file>

<file path="bootstrap-flattener.js">
#!/usr/bin/env node
/**
 * bootstrap-flattener.js
 *
 * This script recursively finds all files in a given directory, ignoring specified
 * patterns, and concatenates them into a single output file with a metadata header.
 *
 * Updated on: Cycle 2
 * - Added comprehensive metadata header including:
 *   - Total file, line, character, and token counts.
 *   - Top 10 files by token count.
 *   - A full list of all processed files with their stats.
 * - Added a configurable `DEFAULT_IGNORE` set to exclude common unnecessary files
 *   and directories (e.g., node_modules, .git, package-lock.json).
 * - Logic inspired by `flattenv2.js` to provide more useful output.
 */

const fs = require('fs').promises;
const path = require('path');

const OUTPUT_FILENAME = 'flattened_repo.md';

// --- Configuration ---
// Files and directories to ignore. Uses simple string matching.
const DEFAULT_IGNORE = new Set([
  'node_modules',
  '.git',
  '.vscode',
  'dist',
  'out',
  'package-lock.json',
  '.DS_Store',
  '.npm',
  '.yarn',
  'flattened_repo.md',
  'prompt.md'
]);


/**
 * Recursively gets all file paths in a directory, respecting the ignore list.
 * @param {string} dirPath The directory to start from.
 * @param {Set<string>} ignoreSet The set of directory/file names to ignore.
 * @returns {Promise<string[]>} A promise that resolves to an array of file paths.
 */
async function getFilePaths(dirPath, ignoreSet) {
  let filePaths = [];
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    if (ignoreSet.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      filePaths = filePaths.concat(await getFilePaths(fullPath, ignoreSet));
    } else {
      filePaths.push(fullPath);
    }
  }
  return filePaths;
}

/**
 * Gets stats and content for a single file.
 * @param {string} filePath The path to the file.
 * @returns {Promise<object>} An object with file stats and content.
 */
async function getFileStatsAndContent(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        const lines = content.split('\n').length;
        const characters = content.length;
        const tokens = Math.ceil(characters / 4); // Simple approximation
        return { filePath, lines, characters, tokens, content, error: null };
    } catch (error) {
        console.warn(`Warning: Could not read file ${filePath}. Error: ${error.message}`);
        return { filePath, lines: 0, characters: 0, tokens: 0, content: `Error reading file: ${error.message}`, error: error.message };
    }
}


/**
 * The main function to execute the script.
 */
async function main() {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    console.error('Usage: node bootstrap-flattener.js <directory_path>');
    process.exit(1);
  }

  const rootDir = path.resolve(args[0]);
  const outputFilePath = path.join(process.cwd(), OUTPUT_FILENAME);

  try {
    await fs.access(rootDir);
  } catch (error) {
    console.error(`Error: Directory not found at ${rootDir}`);
    process.exit(1);
  }

  console.log(`Starting to flatten repository at: ${rootDir}`);
  console.log(`Ignoring: ${[...DEFAULT_IGNORE].join(', ')}`);

  const filePaths = await getFilePaths(rootDir, DEFAULT_IGNORE);
  console.log(`Found ${filePaths.length} files to process...`);

  const results = await Promise.all(filePaths.map(getFileStatsAndContent));

  let totalLines = 0;
  let totalCharacters = 0;
  let totalTokens = 0;
  let errorCount = 0;

  for (const res of results) {
      if (!res.error) {
          totalLines += res.lines;
          totalCharacters += res.characters;
          totalTokens += res.tokens;
      } else {
          errorCount++;
      }
  }

  // --- Build Metadata Header ---
  let output = `<!--\n`;
  output += `  File: ${OUTPUT_FILENAME}\n`;
  output += `  Source Directory: ${rootDir}\n`;
  output += `  Date Generated: ${new Date().toISOString()}\n`;
  output += `  ---\n`;
  output += `  Total Files: ${results.length}\n`;
  if (errorCount > 0) {
      output += `  Files with Errors: ${errorCount}\n`;
  }
  output += `  Total Lines: ${totalLines}\n`;
  output += `  Total Characters: ${totalCharacters}\n`;
  output += `  Approx. Tokens: ${totalTokens}\n`;
  output += `-->\n\n`;

  // --- Top 10 Files by Tokens ---
  const top10 = results
    .filter(r => !r.error)
    .sort((a, b) => b.tokens - a.tokens)
    .slice(0, 10);

  output += `<!-- Top 10 Files by Token Count -->\n`;
  top10.forEach((r, i) => {
     output += `${i + 1}. ${path.relative(rootDir, r.filePath)} (${r.tokens} tokens)\n`;
  });
  output += `\n`;

  // --- Full File List ---
  output += `<!-- Full File List -->\n`;
  results.forEach((r, i) => {
    const relativePath = path.relative(rootDir, r.filePath);
    if (r.error) {
        output += `${i + 1}. ${relativePath} - ERROR: ${r.error}\n`;
    } else {
        output += `${i + 1}. ${relativePath} - Lines: ${r.lines} - Chars: ${r.characters} - Tokens: ${r.tokens}\n`;
    }
  });
  output += `\n`;


  // --- File Contents ---
  for (const { filePath, content } of results) {
    const relativePath = path.relative(rootDir, filePath).replace(/\\/g, '/');
    output += `<file path="${relativePath}">\n`;
    output += content;
    if (!content.endsWith('\n')) {
      output += '\n';
    }
    output += `</file>\n\n`;
  }

  await fs.writeFile(outputFilePath, output);
  console.log(`✅ Success! Flattened repository saved to: ${outputFilePath}`);
}

main().catch(err => {
  console.error('An unexpected error occurred:', err);
  process.exit(1);
});
</file>

<file path="deploy_scaffold.js">
const fs = require('fs').promises;
const path = require('path');

// --- File Content Definitions ---

const filesToCreate = [
    {
        path: 'package.json',
        content: `{
    "name": "data-curation-environment",
    "publisher": "DCE-Developer",
    "displayName": "Data Curation Environment",
    "description": "A VS Code extension for curating context for Large Language Models.",
    "version": "0.0.1",
    "engines": {
        "vscode": "^1.90.0"
    },
    "categories": [
        "Other"
    ],
    "activationEvents": [
        "onView:viewType.sidebar.contextChooser"
    ],
    "main": "./dist/extension.js",
    "contributes": {
        "viewsContainers": {
            "activitybar": [
                {
                    "id": "data-curation-environment",
                    "title": "Data Curation",
                    "icon": "public/spiral.svg"
                }
            ]
        },
        "views": {
            "data-curation-environment": [
                {
                    "type": "webview",
                    "id": "viewType.sidebar.contextChooser",
                    "name": "Context Chooser"
                }
            ]
        }
    },
    "scripts": {
        "vscode:prepublish": "npm run package",
        "compile": "webpack",
        "watch": "webpack --watch",
        "package": "webpack --mode production --devtool hidden-source-map",
        "lint": "eslint src --ext ts"
    },
    "devDependencies": {
        "@types/node": "18.x",
        "@types/vscode": "^1.90.0",
        "@typescript-eslint/eslint-plugin": "^7.7.1",
        "@typescript-eslint/parser": "^7.7.1",
        "eslint": "^8.57.0",
        "ts-loader": "^9.5.1",
        "typescript": "^5.4.5",
        "webpack": "^5.91.0",
        "webpack-cli": "^5.1.4",
        "copy-webpack-plugin": "^12.0.2",
        "style-loader": "^4.0.0",
        "css-loader": "^7.1.2",
        "sass-loader": "^16.0.1",
        "sass": "^1.78.0",
        "postcss-loader": "^8.1.1",
        "babel-loader": "^9.1.3",
        "@babel/preset-react": "^7.24.7",
        "@babel/preset-typescript": "^7.24.7",
        "process": "^0.11.10"
    },
    "dependencies": {
        "react": "^18.3.1",
        "react-dom": "^18.3.1",
        "react-icons": "^5.3.0",
        "rxjs": "^7.8.1",
        "reflect-metadata": "^0.2.2"
    }
}`
    },
    {
        path: 'tsconfig.json',
        content: `{
    "compilerOptions": {
        "module": "esnext",
        "moduleResolution": "node",
        "target": "ESNext",
        "lib": ["ES2022", "DOM"],
        "jsx": "react",
        "sourceMap": true,
        "rootDir": ".",
        "strict": false,
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"]
        },
        "experimentalDecorators": true,
        "allowSyntheticDefaultImports": true
    },
    "include": ["src/**/*"]
}`
    },
    {
        path: 'webpack.config.js',
        content: `const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');

/** @type {import('webpack').Configuration} */
const config = {
    target: 'node',
    mode: 'none',
    entry: {
        extension: './src/extension.ts',
        contextChooserView: './src/client/views/context-chooser.view/view.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    externals: {
        vscode: 'commonjs vscode'
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
        alias: {
            "@": path.resolve(__dirname, 'src'),
        }
    },
    module: {
        rules: [
            {
                test: /\\.ts$/,
                exclude: /node_modules/,
                use: [{ loader: 'ts-loader' }]
            },
            {
                test: /\\.?ts.?(x)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-typescript']
                    }
                }
            },
            {
                test: /\\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
            },
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: "public", to: "public" }],
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    devtool: 'nosources-source-map',
    infrastructureLogging: {
        level: "log",
    },
};
module.exports = [config];`
    },
    {
        path: '.gitignore',
        content: `node_modules
dist
out
*.vsix
.vscode-test/
.vscode/`
    },
    {
        path: '.vscodeignore',
        content: `node_modules
src
.gitignore
webpack.config.js
tsconfig.json
**/*.map
**/*.ts`
    },
    {
        path: '.vscode/launch.json',
        content: `{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Run Extension",
            "type": "extensionHost",
            "request": "launch",
            "args": ["--extensionDevelopmentPath=\${workspaceFolder}"],
            "outFiles": ["\${workspaceFolder}/dist/**/*.js"],
            "preLaunchTask": "npm: watch"
        }
    ]
}`
    },
    {
        path: '.vscode/tasks.json',
        content: `{
    "version": "2.0.0",
    "tasks": [
        {
            "type": "npm",
            "script": "watch",
            "isBackground": true,
            "presentation": {
                "reveal": "never"
            },
            "group": {
                "kind": "build",
                "isDefault": true
            },
            "problemMatcher": {
                "base": "$ts-webpack-watch",
                "background": {
                    "activeOnStart": true,
                    "beginsPattern": "Compilation starting...",
                    "endsPattern": "compiled successfully"
                }
            }
        }
    ]
}`
    },
    {
        path: 'public/spiral.svg',
        content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <g id="Page-1" stroke="none" fill="none" fill-rule="evenodd">
        <g id="dep" transform="translate(4, 6)">
            <path d="M100 100 m 0 -80 a 80 80 0 0 1 0 160 a 70 70 0 0 1 0 -140 a 60 60 0 0 1 0 120 a 50 50 0 0 1 0 -100 a 40 40 0 0 1 0 80 a 30 30 0 0 1 0 -60 a 20 20 0 0 1 0 40"
                fill="none" stroke="white" stroke-width="8" id="Shape" />
        </g>
    </g>
</svg>`
    },
    {
        path: 'src/extension.ts',
        content: `import * as vscode from "vscode";
import { registerViews } from "./client/views";
import { registerCommands } from "./backend/commands/register-commands";
import { Services } from "./backend/services/services";

let globalContext: vscode.ExtensionContext | null = null;

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "Data Curation Environment" is now active!');
    globalContext = context;

    Services.initialize();
    registerCommands(context);
    registerViews(context);
}

export function getContext() {
    if (!globalContext) {
        throw new Error("Extension context not available.");
    }
    return globalContext;
}

export function deactivate() {}`
    },
    {
        path: 'src/common/types/file-node.ts',
        content: `export interface FileNode {
    name: string;
    absolutePath: string;
    children?: FileNode[];
}`
    },
    {
        path: 'src/common/types/vscode-webview.d.ts',
        content: `export interface WebviewApi<StateType> {
    postMessage(message: unknown): void;
    getState(): StateType | undefined;
    setState<T extends StateType | undefined>(newState: T): T;
}

declare global {
    function acquireVsCodeApi<StateType = unknown>(): WebviewApi<StateType>;
}`
    },
    {
        path: 'src/common/ipc/channels.enum.ts',
        content: `export enum ClientToServerChannel {
    RequestFlattenContext = "clientToServer.requestFlattenContext",
    RequestWorkspaceFiles = "clientToServer.requestWorkspaceFiles",
}

export enum ServerToClientChannel {
    SendWorkspaceFiles = "serverToClient.sendWorkspaceFiles",
}`
    },
    {
        path: 'src/common/ipc/channels.type.ts',
        content: `import { FileNode } from "@/common/types/file-node";
import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";

export type ChannelBody<T extends ClientToServerChannel | ServerToClientChannel> =
    T extends ClientToServerChannel.RequestFlattenContext ? { selectedPaths: string[] } :
    T extends ClientToServerChannel.RequestWorkspaceFiles ? {} :
    T extends ServerToClientChannel.SendWorkspaceFiles ? { files: FileNode[] } :
    never;`
    },
    {
        path: 'src/common/ipc/get-vscode-api.ts',
        content: `import { WebviewApi } from "../types/vscode-webview";

let vscode: WebviewApi<unknown> | null = null;

const getVscode = () => {
    if (!vscode) {
        vscode = acquireVsCodeApi();
    }
    return vscode;
};

export default getVscode;`
    },
    {
        path: 'src/common/ipc/client-ipc.ts',
        content: `import getVscode from "./get-vscode-api";
import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";
import { ChannelBody } from "./channels.type";

export class ClientPostMessageManager {
    private static _instance?: ClientPostMessageManager;
    private _listeners: {
        channel: ServerToClientChannel,
        callback: (body: ChannelBody<ServerToClientChannel>) => void
    }[];

    private constructor() {
        this._listeners = [];
        window.addEventListener('message', (event: MessageEvent) => {
            const data = event.data;
            this._listeners.forEach((listener) => {
                if (listener.channel === data.channel) {
                    listener.callback(data.body);
                }
            });
        });
    }

    static getInstance(): ClientPostMessageManager {
        if (!ClientPostMessageManager._instance) {
            ClientPostMessageManager._instance = new ClientPostMessageManager();
        }
        return ClientPostMessageManager._instance;
    }

    sendToServer<T extends ClientToServerChannel>(channel: T, body: ChannelBody<T>): void {
        getVscode().postMessage({ channel, body });
    }

    onServerMessage<T extends ServerToClientChannel>(channel: T, callback: (body: ChannelBody<T>) => void): void {
        this._listeners.push({ channel, callback: callback as any });
    }
}`
    },
    {
        path: 'src/common/ipc/server-ipc.ts',
        content: `import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";
import { ChannelBody } from "./channels.type";

export class ServerPostMessageManager {
    private static _instance?: ServerPostMessageManager;
    private _listeners: {
        channel: ClientToServerChannel,
        callback: (body: ChannelBody<ClientToServerChannel>) => void
    }[];

    private constructor(
        private onMessage: (data: any) => void,
        private sendMessage: (message: any) => void
    ) {
        this._listeners = [];
        this.onMessage((data: any) => {
            this._listeners.forEach((listener) => {
                if (listener.channel === data.channel) {
                    listener.callback(data.body);
                }
            });
        });
    }

    static getInstance(onMessage?: (data: any) => void, sendMessage?: (message: any) => void) {
        if (onMessage && sendMessage) {
            ServerPostMessageManager._instance = new ServerPostMessageManager(onMessage, sendMessage);
        }
        if (!ServerPostMessageManager._instance) {
            throw new Error("ServerPostMessageManager not initialized");
        }
        return ServerPostMessageManager._instance;
    }

    sendToClient<T extends ServerToClientChannel>(channel: T, body: ChannelBody<T>): void {
        this.sendMessage({ channel, body });
    }

    onClientMessage<T extends ClientToServerChannel>(channel: T, callback: (body: ChannelBody<T>) => void): void {
        this._listeners.push({ channel, callback: callback as any });
    }
}`
    },
    {
        path: 'src/common/utils/view-html.ts',
        content: `import * as vscode from "vscode";

export function getViewHtml({ webview, nonce, scriptUri }: { webview: vscode.Webview; nonce: string; scriptUri: string; }): string {
    return \`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src \${webview.cspSource} 'unsafe-inline'; script-src 'nonce-\${nonce}';">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
            <div id="root"></div>
            <script nonce="\${nonce}" src="\${scriptUri}"></script>
        </body>
        </html>\`;
}

function getNonce() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
export { getNonce };`
    },
    {
        path: 'src/client/views/index.ts',
        content: `import { viewConfig as contextChooserViewConfig } from "./context-chooser.view";
import * as vscode from "vscode";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { getNonce, getViewHtml } from "@/common/utils/view-html";

export const views = [contextChooserViewConfig];
export const serverIPCs: Record<string, ServerPostMessageManager> = {};

export function registerViews(context: vscode.ExtensionContext) {
    views.forEach((viewConfig) => {
        context.subscriptions.push(
            vscode.window.registerWebviewViewProvider(viewConfig.type, {
                resolveWebviewView: (webviewView) => {
                    webviewView.webview.options = {
                        enableScripts: true,
                        localResourceRoots: [context.extensionUri],
                    };
                    const nonce = getNonce();
                    webviewView.webview.html = getViewHtml({
                        webview: webviewView.webview,
                        nonce,
                        scriptUri: webviewView.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "dist", viewConfig.entry)).toString(),
                    });
                    const serverIpc = ServerPostMessageManager.getInstance(
                        webviewView.webview.onDidReceiveMessage,
                        (data: any) => webviewView.webview.postMessage(data)
                    );
                    serverIPCs[viewConfig.type] = serverIpc;
                    viewConfig.handleMessage(serverIpc);
                },
            })
        );
    });
}`
    },
    {
        path: 'src/client/views/context-chooser.view/index.ts',
        content: `import { onMessage } from "./on-message";

export const viewConfig = {
    entry: "contextChooserView.js",
    type: "viewType.sidebar.contextChooser",
    handleMessage: onMessage,
};`
    },
    {
        path: 'src/client/views/context-chooser.view/on-message.ts',
        content: `import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { ClientToServerChannel } from "@/common/ipc/channels.enum";
import { Services } from "@/backend/services/services";

export function onMessage(serverIpc: ServerPostMessageManager) {
    const fsService = Services.fsService;
    const flattenerService = Services.flattenerService;

    serverIpc.onClientMessage(ClientToServerChannel.RequestWorkspaceFiles, () =>
        fsService.handleWorkspaceFilesRequest(serverIpc)
    );

    serverIpc.onClientMessage(ClientToServerChannel.RequestFlattenContext, (data) => {
        console.log("Flattening context for paths:", data.selectedPaths);
        flattenerService.flatten(data.selectedPaths);
    });
}`
    },
    {
        path: 'src/client/views/context-chooser.view/view.tsx',
        content: `import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import { FileNode } from '@/common/types/file-node';
import FileTree from '../../components/file-tree/FileTree';
import { useState, useEffect } from 'react';

const App = () => {
    const [files, setFiles] = useState<FileNode[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [activeFile, setActiveFile] = useState<string | undefined>();
    
    const clientIpc = ClientPostMessageManager.getInstance();

    useEffect(() => {
        clientIpc.sendToServer(ClientToServerChannel.RequestWorkspaceFiles, {});

        const handleFileResponse = ({ files: receivedFiles }: { files: FileNode[] }) => {
            setFiles(receivedFiles);
        };
        clientIpc.onServerMessage(ServerToClientChannel.SendWorkspaceFiles, handleFileResponse);

    }, [clientIpc]);

    const handleFileClick = (filePath: string) => {
        setActiveFile(filePath);
    };

    const updateSelectedFiles = (newSelectedFiles: string[]) => {
        setSelectedFiles(newSelectedFiles);
    };

    const handleFlattenClick = () => {
        clientIpc.sendToServer(ClientToServerChannel.RequestFlattenContext, { selectedPaths: selectedFiles });
    };

    return (
        <div className="view-container">
            <div className="view-header">
                <button className="flatten-button" onClick={handleFlattenClick}>
                    Flatten Context
                </button>
            </div>
            <div className="file-tree-container">
                {files.length > 0 ? (
                    files.map((rootNode, index) => (
                        <FileTree
                            key={index}
                            data={[rootNode]}
                            onFileClick={handleFileClick}
                            selectedFiles={selectedFiles}
                            updateSelectedFiles={updateSelectedFiles}
                            activeFile={activeFile}
                        />
                    ))
                ) : (
                    <div className="loading-message">Loading file tree...</div>
                )}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);`
    },
    {
        path: 'src/client/views/context-chooser.view/view.scss',
        content: `body {
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 13px;
    color: var(--vscode-editor-foreground);
    background-color: var(--vscode-sideBar-background);
}

.view-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.view-header {
    padding: 8px;
    border-bottom: 1px solid var(--vscode-panel-border);
}

.flatten-button {
    width: 100%;
    padding: 6px;
    border: 1px solid var(--vscode-button-border, var(--vscode-focusBorder));
    background-color: var(--vscode-button-background);
    color: var(--vscode-button-foreground);
    cursor: pointer;
    border-radius: 2px;
}

.flatten-button:hover {
    background-color: var(--vscode-button-hoverBackground);
}

.file-tree-container {
    padding: 5px;
    flex-grow: 1;
    overflow-y: auto;
}

.loading-message {
    padding: 8px;
    color: var(--vscode-descriptionForeground);
}

.tree-view ul {
    padding-left: 0;
    list-style-type: none;
    margin: 0;
}

.treenode-li {
    padding-left: 20px;
    position: relative;
}

.treenode-item-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 1px 4px;
    border-radius: 3px;
}

.treenode-item-wrapper:hover {
    background-color: var(--vscode-list-hoverBackground);
}

.treenode-chevron {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%) rotate(0deg);
    transition: transform 0.1s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
}

.treenode-chevron.expanded {
    transform: translateY(-50%) rotate(90deg);
}

.file-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1px;
}

.file-item.active {
    background-color: var(--vscode-list-activeSelectionBackground);
    color: var(--vscode-list-activeSelectionForeground);
}

.file-checkbox {
    margin-right: 6px;
    cursor: pointer;
}

.file-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}`
    },
    {
        path: 'src/backend/commands/commands.ts',
        content: `// No commands are needed for now, but we'll keep the file for future use.
export const commands = [];`
    },
    {
        path: 'src/backend/commands/register-commands.ts',
        content: `import * as vscode from "vscode";
import { commands } from "./commands";

export function registerCommands(context: vscode.ExtensionContext) {
    commands.forEach(({ commandId, callback }) => {
        let disposable = vscode.commands.registerCommand(commandId, callback);
        context.subscriptions.push(disposable);
    });
}`
    },
    {
        path: 'src/backend/services/services.ts',
        content: `import "reflect-metadata";
import { FSService } from "./fs.service";
import { FlattenerService } from "./flattener.service";

// A simple container for services
class ServiceContainer {
    public fsService = new FSService();
    public flattenerService = new FlattenerService();
    
    public initialize() {
        // This can be used for service initialization logic in the future
    }
}

export const Services = new ServiceContainer();`
    },
    {
        path: 'src/backend/services/fs.service.ts',
        content: `import * as vscode from "vscode";
import * as path from "path";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { ServerToClientChannel } from "@/common/ipc/channels.enum";
import { FileNode } from "@/common/types/file-node";

export class FSService {
    public async handleWorkspaceFilesRequest(serverIpc: ServerPostMessageManager) {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: [] });
            return;
        }
        
        // For simplicity, we'll just use the first workspace folder.
        const rootUri = workspaceFolders[0].uri;
        if (!rootUri) {
            // This case is unlikely if the above check passes, but good for safety.
            serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: [] });
            return;
        }
        const rootPath = rootUri.fsPath;
        const files = await vscode.workspace.findFiles("**/*");
        const fileTree = this.createFileTree(rootPath, files);

        serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: [fileTree] });
    }

    private createFileTree(rootPath: string, files: vscode.Uri[]): FileNode {
        const rootNode: FileNode = {
            name: path.basename(rootPath),
            absolutePath: rootPath,
            children: []
        };

        for (const file of files) {
            const relativePath = path.relative(rootPath, file.fsPath);
            const parts = relativePath.split(path.sep);
            let currentNode = rootNode;

            for (let i = 0; i < parts.length; i++) {
                const part = parts[i];
                let childNode = currentNode.children?.find(c => c.name === part);

                if (!childNode) {
                    const newPath = path.join(currentNode.absolutePath, part);
                    childNode = { name: part, absolutePath: newPath };
                    if (i < parts.length - 1) {
                        childNode.children = [];
                    }
                    currentNode.children?.push(childNode);
                }
                currentNode = childNode;
            }
        }
        return rootNode;
    }
}`
    },
    {
        path: 'src/client/components/Checkbox.tsx',
        content: `import React from "react";
import { useEffect, useRef } from "react";

interface CheckboxProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange'> {
    checked: boolean;
    indeterminate?: boolean;
    onChange: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = (props: CheckboxProps) => {
    const { checked, onChange, indeterminate, ...rest } = props;
    const cRef = useRef<any>(null);

    useEffect(() => {
        if (cRef.current) {
            cRef.current.indeterminate = indeterminate;
        }
    }, [cRef, indeterminate]);

    return (
        <input type="checkbox" ref={cRef} checked={checked} onChange={(e) => onChange(e.target.checked, e)} {...rest} />
    );
};

export default Checkbox;`
    },
        {
        path: 'src/client/components/file-tree/FileTree.tsx',
        content: `import React, { useEffect, useState } from 'react';
import TreeView from '../tree-view/TreeView';
import { FileNode } from '@/common/types/file-node';
import { addRemovePathInSelectedFiles, getFileNodeByPath } from './FileTree.utils';
import Checkbox from '../Checkbox';

interface FileTreeProps {
  data: FileNode[];
  onFileClick?: (filePath: string) => void;
  selectedFiles: string[];
  activeFile?: string;
  updateSelectedFiles: (selectedFiles: string[]) => void;
}

const FileTree: React.FC<FileTreeProps> = ({
  data,
  onFileClick,
  selectedFiles,
  activeFile,
  updateSelectedFiles,
}) => {

  const rootNode = data.length > 0 ? data[0] : null;

  const [expandedNodes, setExpandedNodes] = useState<string[]>(rootNode ? [rootNode.absolutePath] : []);

  useEffect(() => {
    const toExpand = new Set<string>();
    selectedFiles?.forEach((selectedFile) => {
        const node = getFileNodeByPath(data, selectedFile);
        if (node && node.children) {
            toExpand.add(node.absolutePath);
        }
    });

    setExpandedNodes(prevExpandedNodes => [...new Set([...prevExpandedNodes, ...Array.from(toExpand)])]);
  }, [selectedFiles, data]);

  const handleNodeClick = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, node: FileNode) => {
    if (e && (e.target as HTMLElement)?.closest('.file-checkbox')) {
        return;
    }
    onFileClick && onFileClick(node.absolutePath);
  };

  const renderCheckbox = (path: string) => {
    const isSelected = selectedFiles.includes(path);
    const hasSelectedAncestor = selectedFiles.some(ancestor => path.startsWith(ancestor) && path !== ancestor);
    const hasSelectedDescendant = selectedFiles.some(descendant => descendant.startsWith(path) && descendant !== path);
    
    return (
      <Checkbox
        className="file-checkbox"
        indeterminate={!isSelected && !hasSelectedAncestor && hasSelectedDescendant}
        checked={isSelected || hasSelectedAncestor}
        onChange={(_, e) => handleFileCheckboxChange(e, path)}
      />
    );
  };

  const handleFileCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, path: string) => {
    e.stopPropagation();
    e.preventDefault();
    updateSelectedFiles(addRemovePathInSelectedFiles(data, path, selectedFiles));
  };

  const renderFileNodeContent = (node: FileNode) => {
    const isActive = activeFile === node.absolutePath;
    const isDirectory = Array.isArray(node.children);

    return (
      <div
        className={\`file-item \${isActive ? 'active' : ''} \${isDirectory ? 'directory' : 'file'}\`}
        onClick={(e) => handleNodeClick(e, node)}
      >
        {renderCheckbox(node.absolutePath)}
        <span className="file-name">{node.name}</span>
      </div>
    );
  };

  return (
    <div className="file-tree">
      <TreeView 
        data={data} 
        renderNodeContent={renderFileNodeContent} 
      />
    </div>
  );
};

export default FileTree;`
    },
    {
        path: 'src/client/components/file-tree/FileTree.utils.ts',
        content: `import { FileNode } from "@/common/types/file-node";

function getAllDescendantPaths(node: FileNode): string[] {
    let paths: string[] = [];
    if (node.children) {
        for (const child of node.children) {
            paths.push(child.absolutePath);
            paths = paths.concat(getAllDescendantPaths(child));
        }
    }
    return paths;
}

export const addRemovePathInSelectedFiles = (
  fileTree: FileNode[],
  path: string,
  selectedFiles: string[]
): string[] => {
    const node = getFileNodeByPath(fileTree, path);
    if (!node) return selectedFiles;

    const descendantPaths = getAllDescendantPaths(node);
    const isSelected = selectedFiles.includes(path);
    const hasSelectedAncestor = selectedFiles.some(ancestor => path.startsWith(ancestor) && path !== ancestor);
    
    let newSelectedFiles = [...selectedFiles];

    if (isSelected) {
        // Uncheck: remove this path and all its descendants
        newSelectedFiles = newSelectedFiles.filter(p => p !== path && !descendantPaths.includes(p));
    } else if (hasSelectedAncestor) {
        // Uncheck a child of an already checked folder.
        // 1. Remove the ancestor.
        // 2. Add all children of the ancestor EXCEPT the one that was unchecked.
        const ancestor = selectedFiles.find(ancestor => path.startsWith(ancestor) && path !== ancestor)!;
        const ancestorNode = getFileNodeByPath(fileTree, ancestor)!;
        
        newSelectedFiles = newSelectedFiles.filter(p => p !== ancestor);
        
        const siblingsAndCousins = getAllDescendantPaths(ancestorNode).filter(p => p !== path && !p.startsWith(path));
        newSelectedFiles.push(...siblingsAndCousins);

    } else {
        // Check: remove all descendants that might be individually selected, then add the parent path.
        newSelectedFiles = newSelectedFiles.filter(p => !p.startsWith(path));
        newSelectedFiles.push(path);
    }
  
  return [...new Set(newSelectedFiles)]; // Remove duplicates for cleanliness
};

export const getFileNodeByPath = (
  fileNodes: FileNode[],
  filePath: string
): FileNode | null => {
    for (const rootNode of fileNodes) {
        const found = findNode(rootNode, filePath);
        if (found) return found;
    }
    return null;
};

function findNode(node: FileNode, filePath: string): FileNode | null {
    if (node.absolutePath === filePath) {
        return node;
    }
    if (node.children && filePath.startsWith(node.absolutePath)) {
        for (const child of node.children) {
            const found = findNode(child, filePath);
            if(found) return found;
        }
    }
    return null;
}`
    },
    {
        path: 'src/client/components/tree-view/TreeView.tsx',
        content: `import React, { useState } from 'react';
import { MdChevronRight } from 'react-icons/md';
import { getExpandedNodes } from './TreeView.utils';

export interface TreeNode {
    name: string;
    absolutePath: string;
    children?: TreeNode[];
    isExpanded?: boolean;
    [key: string]: any;
}

interface TreeViewProps {
    data: TreeNode[];
    onNodeClick?: (node: TreeNode) => void;
    renderNodeContent?: (node: TreeNode) => React.ReactNode;
}

const TreeView: React.FC<TreeViewProps> = ({ data, onNodeClick, renderNodeContent }) => {
    const [expandedNodes, setExpandedNodes] = useState<string[]>(getExpandedNodes(data));

    const handleNodeClick = (node: TreeNode) => {
        if (node.children && node.children.length > 0) {
            setExpandedNodes((prevExpandedNodes) => {
                const isExpanded = prevExpandedNodes.includes(node.absolutePath);
                return isExpanded
                    ? prevExpandedNodes.filter((n) => n !== node.absolutePath)
                    : [...prevExpandedNodes, node.absolutePath];
            });
        }
        onNodeClick && onNodeClick(node);
    };

    const renderTreeNodes = (nodes: TreeNode[]) => {
        return nodes.map((node) => {
            const isExpanded = expandedNodes.includes(node.absolutePath);
            const isDirectory = !!(node.children && node.children.length > 0);

            return (
                <li key={node.absolutePath} className="treenode-li">
                    <div
                        onClick={() => handleNodeClick(node)}
                        className={\`treenode-item-wrapper\`}
                    >
                        {isDirectory && (
                            <span
                                className={\`treenode-chevron \${isExpanded ? 'expanded' : ''}\`}
                            >
                                <MdChevronRight />
                            </span>
                        )}
                        {renderNodeContent ? renderNodeContent(node) : node.name}
                    </div>
                    {isDirectory && isExpanded && (
                        <ul className="treenode-children">{renderTreeNodes(node.children)}</ul>
                    )}
                </li>
            );
        });
    };

    return (
        <div className="tree-view">
            <ul>{renderTreeNodes(data)}</ul>
        </div>
    );
};

export default TreeView;`
    },
    {
        path: 'src/client/components/tree-view/TreeView.utils.ts',
        content: `import { TreeNode } from "./TreeView";

export const getExpandedNodes = (data: TreeNode[]): string[] => {
  return data.reduce((acc: string[], node) => {
    if (node.isExpanded) {
      acc.push(node.absolutePath);
    }
    if (node.children) {
      acc.push(...getExpandedNodes(node.children));
    }
    return acc;
  }, []);
};`
    },
    {
        path: 'src/backend/services/flattener.service.ts',
        content: `import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs/promises';

interface FileStats {
    filePath: string;
    lines: number;
    characters: number;
    tokens: number;
    content: string;
    error: string | null;
}

export class FlattenerService {

    public async flatten(selectedPaths: string[]) {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            vscode.window.showErrorMessage("Cannot flatten context: No workspace folder is open.");
            return;
        }
        if (selectedPaths.length === 0) {
            vscode.window.showWarningMessage("Cannot flatten context: No files or folders are selected.");
            return;
        }

        const rootPath = workspaceFolders[0].uri.fsPath;
        const outputFilePath = path.join(rootPath, 'flattened_repo.md');

        try {
            const allFilePaths = await this.expandDirectories(selectedPaths);
            const uniqueFilePaths = [...new Set(allFilePaths)];

            const fileStatsPromises = uniqueFilePaths.map(filePath => this.getFileStatsAndContent(filePath));
            const results = await Promise.all(fileStatsPromises);

            const outputContent = this.generateOutputContent(results, rootPath, outputFilePath);

            await fs.writeFile(outputFilePath, outputContent, 'utf-8');
            vscode.window.showInformationMessage(\`Successfully flattened \${results.filter(r => !r.error).length} files to flattened_repo.md.\`);

        } catch (error: any) {
            vscode.window.showErrorMessage(\`Failed to flatten context: \${error.message}\`);
            console.error(error);
        }
    }

    private async expandDirectories(paths: string[]): Promise<string[]> {
        const allFiles: string[] = [];
        for (const p of paths) {
            try {
                const stats = await fs.stat(p);
                if (stats.isDirectory()) {
                    allFiles.push(...await this.getAllFilesRecursive(p));
                } else {
                    allFiles.push(p);
                }
            } catch (e) {
                console.warn(\`Could not stat path \${p}, skipping.\`);
            }
        }
        return allFiles;
    }

    private async getAllFilesRecursive(dirPath: string): Promise<string[]> {
        let files: string[] = [];
        try {
            const entries = await fs.readdir(dirPath, { withFileTypes: true });
            for (const entry of entries) {
                const fullPath = path.join(dirPath, entry.name);
                if (entry.isDirectory()) {
                    files = files.concat(await this.getAllFilesRecursive(fullPath));
                } else {
                    files.push(fullPath);
                }
            }
        } catch (e) {
            console.error(\`Error reading directory \${dirPath}:\`, e);
        }
        return files;
    }

    private async getFileStatsAndContent(filePath: string): Promise<FileStats> {
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            const lines = content.split('\\n').length;
            const characters = content.length;
            const tokens = Math.ceil(characters / 4);
            return { filePath, lines, characters, tokens, content, error: null };
        } catch (error: any) {
            return { filePath, lines: 0, characters: 0, tokens: 0, content: '', error: error.message };
        }
    }

    private generateOutputContent(results: FileStats[], rootDir: string, outputFilename: string): string {
        let totalLines = 0;
        let totalCharacters = 0;
        let totalTokens = 0;
        let errorCount = 0;
        const validResults = results.filter(r => !r.error);

        for (const res of validResults) {
            totalLines += res.lines;
            totalCharacters += res.characters;
            totalTokens += res.tokens;
        }

        let output = \`<!--\\n\`;
        output += \`  File: \${path.basename(outputFilename)}\\n\`;
        output += \`  Source Directory: \${rootDir}\\n\`;
        output += \`  Date Generated: \${new Date().toISOString()}\\n\`;
        output += \`  ---\\n\`;
        output += \`  Total Files: \${validResults.length}\\n\`;
        if (errorCount > 0) {
            output += \`  Files with Errors: \${errorCount}\\n\`;
        }
        output += \`  Total Lines: \${totalLines}\\n\`;
        output += \`  Total Characters: \${totalCharacters}\\n\`;
        output += \`  Approx. Tokens: \${totalTokens}\\n\`;
        output += \`-->\\n\\n\`;

        const top10 = [...validResults].sort((a, b) => b.tokens - a.tokens).slice(0, 10);

        output += \`<!-- Top 10 Files by Token Count -->\\n\`;
        top10.forEach((r, i) => {
            output += \`\${i + 1}. \${path.relative(rootDir, r.filePath)} (\${r.tokens} tokens)\\n\`;
        });
        output += \`\\n\`;

        output += \`<!-- Full File List -->\\n\`;
        results.forEach((r, i) => {
            const relativePath = path.relative(rootDir, r.filePath);
            if (r.error) {
                output += \`\${i + 1}. \${relativePath} - ERROR: \${r.error}\\n\`;
            } else {
                output += \`\${i + 1}. \${relativePath} - Lines: \${r.lines} - Chars: \${r.characters} - Tokens: \${r.tokens}\\n\`;
            }
        });
        output += \`\\n\`;

        for (const { filePath, content, error } of results) {
            const relativePath = path.relative(rootDir, filePath).replace(/\\\\/g, '/');
            output += \`<file path="\${relativePath}">\\n\`;
            if (error) {
                output += \`Error reading file: \${error}\\n\`;
            } else {
                output += content;
            }
            if (!content.endsWith('\\n')) {
                output += '\\n';
            }
            output += \`</file>\\n\\n\`;
        }
        return output;
    }
}`
    }
];

// --- Main Execution ---

async function deployScaffold() {
    console.log('Starting scaffold deployment...');
    const rootDir = process.cwd();

    for (const file of filesToCreate) {
        const fullPath = path.join(rootDir, file.path);
        const dir = path.dirname(fullPath);

        try {
            await fs.mkdir(dir, { recursive: true });
            await fs.writeFile(fullPath, file.content, 'utf-8');
            console.log(`✅ Created: ${file.path}`);
        } catch (error) {
            console.error(`❌ Failed to create ${file.path}: ${error.message}`);
        }
    }

    console.log('\n🚀 Scaffold deployment complete! 🚀');
    console.log('Next steps:');
    console.log('1. Run npm install to install dependencies.');
    console.log('2. Press F5 in VS Code to start the extension (this will also run npm run watch).');
}

deployScaffold();
</file>

<file path="package.json">
{
    "name": "data-curation-environment",
    "publisher": "DCE-Developer",
    "displayName": "Data Curation Environment",
    "description": "A VS Code extension for curating context for Large Language Models.",
    "version": "0.0.1",
    "engines": {
        "vscode": "^1.90.0"
    },
    "categories": [
        "Other"
    ],
    "activationEvents": [
        "onView:viewType.sidebar.contextChooser"
    ],
    "main": "./dist/extension.js",
    "contributes": {
        "viewsContainers": {
            "activitybar": [
                {
                    "id": "data-curation-environment",
                    "title": "Data Curation",
                    "icon": "public/spiral.svg"
                }
            ]
        },
        "views": {
            "data-curation-environment": [
                {
                    "type": "webview",
                    "id": "viewType.sidebar.contextChooser",
                    "name": "Data Curation"
                }
            ]
        }
    },
    "scripts": {
        "vscode:prepublish": "npm run package",
        "compile": "webpack",
        "watch": "webpack --watch",
        "package": "webpack --mode production --devtool hidden-source-map",
        "lint": "eslint src --ext ts"
    },
    "devDependencies": {
        "@types/node": "18.x",
        "@types/vscode": "^1.90.0",
        "@typescript-eslint/eslint-plugin": "^7.7.1",
        "@typescript-eslint/parser": "^7.7.1",
        "eslint": "^8.57.0",
        "ts-loader": "^9.5.1",
        "typescript": "^5.4.5",
        "webpack": "^5.91.0",
        "webpack-cli": "^5.1.4",
        "copy-webpack-plugin": "^12.0.2",
        "style-loader": "^4.0.0",
        "css-loader": "^7.1.2",
        "sass-loader": "^16.0.1",
        "sass": "^1.78.0",
        "postcss-loader": "^8.1.1",
        "babel-loader": "^9.1.3",
        "@babel/preset-react": "^7.24.7",
        "@babel/preset-typescript": "^7.24.7",
        "process": "^0.11.10"
    },
    "dependencies": {
        "react": "^18.3.1",
        "react-dom": "^18.3.1",
        "react-icons": "^5.3.0",
        "rxjs": "^7.8.1",
        "reflect-metadata": "^0.2.2"
    }
}
</file>

<file path="public/spiral.svg">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <g id="Page-1" stroke="none" fill="none" fill-rule="evenodd">
        <g id="dep" transform="translate(4, 6)">
            <path d="M100 100 m 0 -80 a 80 80 0 0 1 0 160 a 70 70 0 0 1 0 -140 a 60 60 0 0 1 0 120 a 50 50 0 0 1 0 -100 a 40 40 0 0 1 0 80 a 30 30 0 0 1 0 -60 a 20 20 0 0 1 0 40"
                fill="none" stroke="white" stroke-width="8" id="Shape" />
        </g>
    </g>
</svg>
</file>

<file path="src/Artifacts/A0. DCE Master Artifact List.md">
# Artifact A0: DCE Master Artifact List
# Date Created: C1
# Author: AI Model & Curator
# Updated on: C20 (Add A14 for Ongoing Development Issues)

## 1. Purpose

# This file serves as the definitive, parseable list of all documentation artifacts for the "Data Curation Environment" (DCE) VS Code Extension project.

## 2. Formatting Rules for Parsing

# *   Lines beginning with `#` are comments and are ignored.
# *   `##` denotes a major category header and is ignored.
# *   `###` denotes an artifact entry. The text following it is the artifact's full name and ID.
# *   Lines beginning with `- **Description:**` provide context for the project.
# *   Lines beginning with `- **Tags:**` provide keywords for Inference.

## 3. Artifacts List

## I. Project Planning & Design

### A1. DCE - Project Vision and Goals
- **Description:** High-level overview of the DCE VS Code extension, its purpose, and the three-phase development plan.
- **Tags:** project vision, goals, scope, phase 1, phase 2, phase 3, vs code extension

### A2. DCE - Phase 1 - Context Chooser - Requirements & Design
- **Description:** Detailed functional and technical requirements for Phase 1, focusing on the file tree with checkboxes and the flattening functionality.
- **Tags:** requirements, design, phase 1, context chooser, tree view, checkbox, flatten, vs code api

### A3. DCE - Technical Scaffolding Plan
- **Description:** Outlines the proposed file structure, technologies, and key VS Code API components for the extension, based on the `The-Creator-AI-main` reference repo.
- **Tags:** technical plan, scaffolding, file structure, typescript, vs code extension, api

### A4. DCE - Analysis of The-Creator-AI Repo
- **Description:** Provides a detailed analysis of the `The-Creator-AI-main` reference repository, its architecture, and its mapping to the Data Curation Environment project goals.
- **Tags:** analysis, repository, architecture, vscode-extension, project-planning

### A5. DCE - Target File Structure
- **Description:** A text-based representation of the target file structure for the DCE extension, outlining the layout of directories and key files.
- **Tags:** file structure, architecture, project layout, scaffolding

### A6. DCE - Initial Scaffolding Deployment Script
- **Description:** Contains a Node.js script that, when executed, creates the entire initial directory structure and files for the DCE extension project.
- **Tags:** deployment, script, scaffolding, bootstrap, nodejs, automation

### A7. DCE - Development and Testing Guide
- **Description:** A step-by-step guide explaining how to run, debug, and test the DCE extension within VS Code using the Extension Development Host.
- **Tags:** development, testing, debugging, workflow, vs code extension, f5

### A8. DCE - Phase 1 - Selection Sets Feature Plan
- **Description:** A plan outlining the user stories, UI/UX, and technical implementation for saving and loading different sets of selected files (selection profiles).
- **Tags:** feature plan, selection sets, profiles, context management, phase 1

### A9. DCE - GitHub Repository Setup Guide
- **Description:** A step-by-step guide with the necessary git commands to initialize the project as a local repository and push it to a new remote repository on GitHub.
- **Tags:** git, github, version control, setup, repository

### A10. DCE - Metadata and Statistics Display
- **Description:** Outlines the requirements and design for displaying live metadata (total selected files, total tokens) and for showing aggregate statistics (token and file counts) for folders in the file tree.
- **Tags:** feature plan, metadata, statistics, token count, ui, ux

### A11. DCE - Regression Case Studies
- **Description:** Documents recurring bugs, their root causes, and codified solutions to prevent future regressions during development.
- **Tags:** bugs, regression, troubleshooting, development, best practices

### A12. DCE - Logging and Debugging Guide
- **Description:** Explains how to access and use the integrated logging solution for debugging the extension's backend and frontend components.
- **Tags:** logging, debugging, troubleshooting, development, output channel

### A13. DCE - Phase 1 - Right-Click Context Menu
- **Description:** A plan for implementing standard file explorer context menu actions (e.g., Rename, Delete, Copy Path) in the custom file tree.
- **Tags:** feature plan, context menu, right-click, file operations, ux, phase 1

### A14. DCE - Ongoing Development Issues
- **Description:** A tracking document for recurring or persistent issues that need to be monitored across development cycles until they are confirmed as resolved.
- **Tags:** bugs, tracking, issues, logging, node_modules, performance

## II. Standalone Utilities & Guides

### A189. Number Formatting Reference Guide
- **Description:** A standalone guide and utility script for formatting large numbers with K/M/B/T suffixes and dynamic decimal place adjustment for clean UI presentation.
- **Tags:** utility, script, formatting, numbers, ui, ux, javascript, typescript
</file>

<file path="src/Artifacts/A1. DCE - Project Vision and Goals.md">
# Artifact A1: DCE - Project Vision and Goals
# Date Created: Cycle 1
# Author: AI Model
# Updated on: Cycle 2 (Reflect findings from reference repository analysis)

## 1. Project Vision

The vision of the Data Curation Environment (DCE) is to create a seamless, integrated toolset within VS Code that streamlines the workflow of interacting with large language models. The core problem this project solves is the manual, cumbersome process of selecting, packaging, and managing the context (code files, documents, etc.) required for effective AI-assisted development.

## 2. High-Level Goals & Phases

The project will be developed in three distinct phases.

**Note on Reference Repository:** The discovery of the `The-Creator-AI-main` repository in Cycle 2 has provided a significant head-start, especially for Phase 1 and 2. The project's focus shifts from building these components from the ground up to adapting and extending the powerful, existing foundation.

### Phase 1: The Context Chooser

The goal of this phase is to eliminate the manual management of a `files_list.txt`. Users should be able to intuitively select files and folders for their AI context directly within the VS Code file explorer UI.

-   **Core Functionality:** Implement a file explorer view with checkboxes for every file and folder.
-   **Action:** A "Flatten Context" button will take all checked items and generate a single `flattened_repo.md` file in the project root.
-   **Outcome:** A user can curate a complex context with simple mouse clicks, completely removing the need to edit a text file.
-   **Update (Cycle 2):** The reference repository contains a fully-featured `FileTree.tsx` component that already accomplishes most of this. The task is now to adapt this component and its backend `FSService` to produce the desired `flattened_repo.md` output.

### Phase 2: The Parallel Co-Pilot Panel

This phase addresses the limitation of being locked into a single conversation with an AI assistant. The goal is to enable multiple, parallel interactions to compare and contrast different prompts or approaches simultaneously.

-   **Core Functionality:** Create a custom panel within VS Code that can host multiple, independent "chat" or "prompt" windows.
-   **Outcome:** A user can send the same (or different) prompts to multiple AI instances and view the results side-by-side, dramatically improving the efficiency of prompt engineering and response evaluation.
-   **Update (Cycle 2):** The reference repository's "Change Plan" view is an excellent, full-featured implementation of a *single* co-pilot panel. This provides a solid architectural base to build upon for the parallelization feature.

### Phase 3: The Integrated Diff Tool

This phase aims to bring a critical part of the external workflow—comparing text files—directly into the VS Code extension.

-   **Core Functionality:** Create a simple diffing utility within a VS Code webview. The user should be able to select two text sources (e.g., two AI responses from the Phase 2 panel, or a new response and an existing file) and see a visual comparison.
-   **Outcome:** Reduces the friction of copying and pasting text into external tools like WinMerge, keeping the entire curation and review workflow inside VS Code.
</file>

<file path="src/Artifacts/A10. DCE - Metadata and Statistics Display.md">
# Artifact A10: DCE - Metadata and Statistics Display
# Date Created: Cycle 14
# Author: AI Model
# Updated on: C15 (Add image file size handling and UI refinements)

- **Key/Value for A0:**
- **Description:** Outlines the requirements and design for displaying live metadata (total selected files, total tokens) and for showing aggregate statistics (token and file counts) for folders in the file tree.
- **Tags:** feature plan, metadata, statistics, token count, ui, ux

## 1. Overview & Goal

To enhance the data curation process, it is critical for the user to have immediate, quantitative feedback on their selections. This feature will provide at-a-glance statistics at both the folder level and the overall selection level. The goal is to empower the user to make informed decisions about context size and composition without needing to perform manual calculations.

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| US-01 | **Folder Statistics** | As a data curator, I want to see the total token count and the total number of files contained within each folder, so I can quickly assess the size and complexity of different parts of my project. | - Next to each folder name in the file tree, a token count is displayed. <br> - This token count is the recursive sum of all tokens from all non-image files within that folder and its subfolders. <br> - Next to the token count, a file count is also displayed, formatted with commas (e.g., "1,234"). <br> - These numbers are calculated on the backend and provided with the initial file tree data. |
| US-02 | **Live Selection Summary** | As a data curator, I want to see a live summary of my total selection as I check and uncheck files, so I can monitor the total size of my context in real-time. | - A dedicated summary panel/footer is visible in the UI. <br> - This panel displays "X files" and "Y tokens". <br> - "X" is the total count of all individual files included in the current selection, formatted with commas. <br> - "Y" is the sum of all token counts for those selected non-image files. <br> - These values update instantly whenever a checkbox is changed. |
| US-03 | **Readable Numbers & Icons** | As a data curator, I want large token counts to be formatted in a compact and readable way (e.g., 1,234 becomes "1.2K"), and for icons to visually represent the data, so I can easily parse the information. | - All token counts use K/M/B suffixes for numbers over 1,000. <br> - All file counts use commas for thousands separators. <br> - An icon is displayed next to the token count and file count for visual distinction. <br> - The statistics are right-justified in the file tree for better readability. |
| US-04 | **Image File Handling** | As a data curator, I want to see the file size for images instead of a token count, so I can understand their contribution to storage/transfer size rather than context length. | - The backend identifies common image file types (png, jpg, etc.). <br> - For image files, the token count is treated as 0. <br> - In the file tree, instead of a token count, the human-readable file size is displayed (e.g., "15.2 KB", "2.1 MB"). |

## 3. Technical Implementation Plan

1.  **Backend (`fs.service.ts`):**
    *   The `FileNode` interface in `src/common/types/file-node.ts` will be updated to include `isImage: boolean` and `sizeInBytes: number`.
    *   The backend service will maintain a list of image file extensions.
    *   When building the tree, it will check each file's extension.
    *   If it's an image, it will use `fs.stat` to get the `sizeInBytes`, set `isImage: true`, and set `tokenCount: 0`.
    *   If it's not an image, it will calculate the `tokenCount` and get the `sizeInBytes`.
    *   The recursive sum logic for folders will aggregate `tokenCount`, `fileCount`, and `sizeInBytes` from their children.
    *   The `vscode.workspace.findFiles` call will be updated to exclude the `node_modules` directory.

2.  **Frontend - Formatting (`formatting.ts`):**
    *   A new `formatBytes(bytes)` utility will be created to convert bytes to KB, MB, etc.
    *   A new `formatNumberWithCommas(number)` utility will be created.

3.  **Frontend - File Tree (`FileTree.tsx` & `view.scss`):**
    *   The `FileTree.tsx` component will be updated to render the new data.
    *   It will conditionally display either a formatted token count (using `formatLargeNumber`) or a formatted file size (using `formatBytes`) based on the `isImage` flag.
    *   It will display folder file counts using `formatNumberWithCommas`.
    *   It will incorporate icons from `react-icons/vsc` for tokens and file counts.
    *   The stylesheet (`view.scss`) will be updated to right-align all statistics, pushing them to the end of the file/folder row.

4.  **Frontend - Live Summary Panel (`context-chooser.view.tsx`):**
    *   The `useMemo` hook that calculates the summary will be updated to correctly sum the total number of files and total tokens from the selected items. It will continue to ignore image sizes for the token total to avoid mixing units.
    *   The rendered output will use the new formatting utilities and icons.
</file>

<file path="src/Artifacts/A11. DCE - Regression Case Studies.md">
# Artifact A11: DCE - Regression Case Studies
# Date Created: Cycle 16
# Author: AI Model & Curator
# Updated on: C16 (Add Case Study for Checkbox State Management)

- **Key/Value for A0:**
- **Description:** Documents recurring bugs, their root causes, and codified solutions to prevent future regressions during development.
- **Tags:** bugs, regression, troubleshooting, development, best practices

## 1. Purpose

This document serves as a living record of persistent or complex bugs that have recurred across multiple development cycles. By documenting the root cause analysis (RCA) and the confirmed solution for each issue, we create a "source of truth" that can be referenced to prevent the same mistakes from being reintroduced into the codebase.

## 2. Case Studies

---

### Case Study 002: Checkbox State Management in File Tree

-   **Artifacts Affected:** `src/client/components/file-tree/FileTree.utils.ts`, `src/client/components/file-tree/FileTree.tsx`
-   **Cycles Observed:** 14, 15, 16
-   **Symptom:** Checkbox functionality in the file tree is erratic. Only the root checkbox works as expected, but individual files or sub-folders cannot be checked or unchecked correctly. Clicking a checkbox on a child of an already-selected folder fails to deselect it.
-   **Root Cause Analysis (RCA):**
    The core issue was overly complex and flawed state management logic within the `addRemovePathInSelectedFiles` utility function. The logic attempted to handle the "unchecking a child of a selected parent" case by removing the parent and re-adding all of its other children (the "siblings"). This approach was brittle and failed to correctly calculate the new state, leading to a UI that did not update correctly. The complexity made the function difficult to debug and maintain.

-   **Codified Solution & Best Practice:**
    1.  **Simplify State Logic:** The state management logic was rewritten to be more direct and declarative, using a `Set` for efficient manipulation of selected paths.
    2.  **Handle Cases Explicitly:** The new function explicitly handles the three primary user actions:
        *   **CHECK:** When a node is checked, any of its descendants that are already in the selection are removed, and the node's own path is added. This ensures the most senior selected path is always the one stored in state.
        *   **UNCHECK (Direct):** When a node that is explicitly in the selection list is unchecked, its path and the paths of all its descendants are removed.
        *   **UNCHECK (Subtractive):** When a node is unchecked because its parent was checked, the parent is removed from the selection. Then, all of the parent's direct children *except for the one that was clicked* are added to the selection. This correctly "subtracts" the item from the parent's group selection without complex traversals.
    3.  **Robust Event Handling:** Ensure the checkbox `onChange` handler in the React component uses `event.stopPropagation()` to prevent the click event from bubbling up and triggering other actions, such as folder expansion.

-   **Example of Flawed Logic (Conceptual):**
    ```typescript
    // OLD LOGIC
    if (unchecking a child of a selected parent) {
      // 1. Remove parent from selected list.
      // 2. Traverse the entire tree from the parent.
      // 3. Add every descendant of the parent back, EXCEPT the clicked child.
      // This was inefficient and error-prone.
    }
    ```

-   **Example of Correct Logic (Conceptual):**
    ```typescript
    // NEW LOGIC
    if (unchecking a child of a selected parent) {
      // 1. Remove the parent from the selection set.
      const parentNode = findParentNode(clickedPath);
      // 2. Add all of the parent's *direct children* to the selection set,
      //    except for the clicked child itself.
      parentNode.children.forEach(child => {
        if (child.path !== clickedPath) {
          selectionSet.add(child.path);
        }
      });
    }
    ```

---

### Case Study 001: `path.sep` Usage in Frontend Components

-   **Artifacts Affected:** `src/client/components/file-tree/FileTree.tsx`
-   **Cycles Observed:** 13, 14, 16
-   **Symptom:** The webpack build process fails with TypeScript errors similar to `TS2339: Property 'sep' does not exist on type 'string'`.
-   **Root Cause Analysis (RCA):**
    The error occurs when frontend code (React components running in a webview) attempts to use `path.sep`. The `path` module is a core part of the Node.js runtime, but it does not exist in the browser-like context of a webview.
-   **Codified Solution & Best Practice:**
    1.  **Strict Environment Separation:** All file system path manipulation **must** occur in the backend (`src/backend/`).
    2.  **Normalized Paths:** The backend must normalize all paths to use forward slashes (`/`) before sending them to the frontend.
    3.  **Frontend Simplicity:** The frontend code must treat all file paths as simple strings and should never attempt to parse or join them using path-specific separators.
</file>

<file path="src/Artifacts/A12. DCE - Logging and Debugging Guide.md">
# Artifact A12: DCE - Logging and Debugging Guide
# Date Created: Cycle 19
# Author: AI Model
# Updated on: C19 (Add explicit clarification on where to find different types of logs.)

- **Key/Value for A0:**
- **Description:** Explains how to access and use the integrated logging solution for debugging the extension's backend and frontend components.
- **Tags:** logging, debugging, troubleshooting, development, output channel

## 1. Purpose

This document provides instructions on how to access and use the logging features built into the Data Curation Environment (DCE) extension. Effective logging is crucial for diagnosing performance issues, tracking down bugs, and understanding the extension's behavior during development.

## 2. Two Primary Log Locations

There are two separate places to look for logs, depending on where the code is running.

### Location 1: The "Debug Console" (For `console.log`)

This is where you find logs from the **backend** (the extension's main Node.js process).

-   **What you'll see here:** `console.log()` statements from files in `src/backend/` and `src/extension.ts`. This is useful for debugging the extension's core activation and services *before* the UI is even visible.
-   **Where to find it:** In your **main development window** (the one where you press `F5`), look in the bottom panel for the **"DEBUG CONSOLE"** tab.

    ```
    -----------------------------------------------------------------------------------
    | PROBLEMS    OUTPUT    DEBUG CONSOLE    TERMINAL                                 |
    |---------------------------------------------------------------------------------|
    |                                                                                 |
    |  > Congratulations, your extension "Data Curation Environment" is now active!   |
    |  > FSService watcher initialized.                                               |
    |  ...                                                                            |
    -----------------------------------------------------------------------------------
    ```

### Location 2: The "Output" Channel (For Centralized Logging)

This is the primary, centralized log for the entire extension, including messages from the **frontend (WebView)**.

-   **What you'll see here:** Formatted log messages from both the backend (`LoggerService`) and the frontend (`logger.ts`). All messages are prefixed with a level (`[INFO]`, `[WARN]`, `[ERROR]`) and a timestamp. Frontend messages are also prefixed with `[WebView]`.
-   **Where to find it:** In the **"[Extension Development Host]" window** (the new window that opens after you press `F5`), follow these steps:
    1.  **Open the Panel:** Press `Ctrl+J` (or `Cmd+J` on Mac).
    2.  **Navigate to the "OUTPUT" Tab.**
    3.  In the dropdown menu on the right, select **`Data Curation Environment`**.

    ```
    -----------------------------------------------------------------------------------
    | PROBLEMS    OUTPUT    DEBUG CONSOLE    TERMINAL                                 |
    |---------------------------------------------------------------------------------|
    |                                                 [Data Curation Environment v]   |
    |                                                                                 |
    |  [INFO] [2:30:00 PM] Services initialized.                                      |
    |  [INFO] [2:30:01 PM] Received request for workspace files.                      |
    |  [INFO] [2:30:01 PM] [WebView] Initializing view and requesting workspace files.|
    |  [INFO] [2:30:01 PM] Scanning for files with exclusion pattern: ...             |
    |  ...                                                                            |
    -----------------------------------------------------------------------------------
    ```

## 3. What is Logged?

*   **Backend Initialization:** Messages indicating that services are starting.
*   **File System Scans & Refreshes:**
    *   Confirmation when a file scan begins, including the exclusion pattern used.
    *   Confirmation when a file change is detected by the watcher.
    *   Confirmation when a refresh is triggered.
*   **Errors:** Any caught exceptions on both the backend and frontend are logged with an `[ERROR]` prefix.
*   **Frontend Actions:** Key user interactions in the UI (button clicks, etc.) are logged with a `[WebView]` prefix.
</file>

<file path="src/Artifacts/A13. DCE - Phase 1 - Right-Click Context Menu.md">
# Artifact A13: DCE - Phase 1 - Right-Click Context Menu
# Date Created: Cycle 19
# Author: AI Model
# Updated on: C21 (Reflect implementation details and new file/folder actions)

- **Key/Value for A0:**
- **Description:** A plan for implementing standard file explorer context menu actions (e.g., Rename, Delete, Copy Path) in the custom file tree.
- **Tags:** feature plan, context menu, right-click, file operations, ux, phase 1

## 1. Overview & Goal

To enhance the user experience and make the Data Curation Environment's file tree a more complete replacement for the native VS Code explorer, this feature will add a standard right-click context menu and associated toolbar buttons. The goal is to provide essential file management operations directly within our extension's view, reducing the need for users to switch back to the native explorer for common tasks.

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| US-01 | **Copy Path** | As a user, I want to right-click a file or folder and copy its absolute or relative path to my clipboard, so I can easily reference it elsewhere. | - Right-clicking a node in the file tree opens a context menu. <br> - The menu contains "Copy Path" and "Copy Relative Path" options. <br> - Selecting an option copies the corresponding path string to the system clipboard. |
| US-02 | **Rename File/Folder** | As a user, I want to right-click a file or folder and rename it, so I can correct mistakes or refactor my project structure. | - The context menu contains a "Rename" option. <br> - Selecting it turns the file/folder name into an editable input field. <br> - Pressing Enter or clicking away saves the new name. <br> - The underlying file/folder is renamed on the file system. <br> - The file tree updates to reflect the change. |
| US-03 | **Delete File/Folder** | As a user, I want to right-click a file or folder and delete it, so I can remove unnecessary files from my project. | - The context menu contains a "Delete" option. <br> - Selecting it shows a confirmation dialog to prevent accidental deletion. <br> - Upon confirmation, the file or folder (and its contents, recursively) is moved to the trash/recycling bin. <br> - The file tree updates to reflect the change. |
| US-04 | **Reveal in Explorer** | As a user, I want to right-click a file or folder and have it revealed in the native OS file explorer, so I can interact with it outside of VS Code. | - The context menu contains a "Reveal in File Explorer" (or "Reveal in Finder" on macOS) option. <br> - Selecting it opens the parent directory of the item in the operating system's default file manager with the item selected. |
| US-05 | **New File/Folder** | As a user, I want to create new files and folders from the toolbar or context menu, so I can build out my project structure without leaving the view. | - The header toolbar has "New File" and "New Folder" buttons. <br> - The context menu has "New File..." and "New Folder..." options. <br> - Clicking either prompts for a name. <br> - The new file/folder is created in the appropriate directory (workspace root for toolbar, selected folder for context menu). <br> - The file tree automatically refreshes. |

## 3. Technical Implementation Plan

1.  **Frontend (`FileTree.tsx`, new `ContextMenu.tsx`):**
    *   Create a new reusable `ContextMenu.tsx` component that can be triggered by an `onContextMenu` event. It will render at the mouse position.
    *   In `TreeView.tsx`, add an `onContextMenu` event handler to each file/folder item wrapper.
    *   This handler will prevent the default browser menu, get the file node's data, and render the `ContextMenu` component with the appropriate options.
    *   For "Rename", the `FileTree.tsx` component will need to manage local state to switch between displaying the name and an `<input>` field for the specific node being renamed.

2.  **IPC Channels (`channels.enum.ts`, `channels.type.ts`):**
    *   New `ClientToServerChannel` messages will be required for each action:
        *   `RequestFileRename`: Body `{ oldPath: string, newName: string }`
        *   `RequestFileDelete`: Body `{ path: string }`
        *   `RequestRevealInExplorer`: Body `{ path: string }`
        *   `RequestCopyPath`: Body `{ path: string, relative: boolean }`
        *   `RequestNewFile`: Body `{ parentDirectory: string }`
        *   `RequestNewFolder`: Body `{ parentDirectory: string }`

3.  **Backend (`fs.service.ts`, `on-message.ts`):**
    *   Update `on-message.ts` to handle the new IPC messages and call corresponding methods in the `FSService`.
    *   **Rename:** Implement a method that uses `vscode.workspace.fs.rename(oldUri, newUri)`.
    *   **Delete:** Implement a method that uses `vscode.window.showWarningMessage` for confirmation, then `vscode.workspace.fs.delete(uri, { recursive: true, useTrash: true })`. The `useTrash` option is crucial for data safety.
    *   **Reveal:** Implement a method that executes the built-in VS Code command: `vscode.commands.executeCommand('revealInExplorer', uri)`.
    *   **Copy Path:** Implement a method that uses `vscode.env.clipboard.writeText()` to put the absolute or relative path (calculated using `path.relative`) on the clipboard.
    *   **New File/Folder:** Implement methods that prompt for a name with `vscode.window.showInputBox`, then create the item with `vscode.workspace.fs.writeFile` or `vscode.workspace.fs.createDirectory`.
    *   After any file system modification (rename, delete, create), the backend's `FileSystemWatcher` will automatically detect the change and trigger a debounced refresh of the UI.
</file>

<file path="src/Artifacts/A14. DCE - Ongoing Development Issues.md">
# Artifact A14: DCE - Ongoing Development Issues
# Date Created: C20
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A tracking document for recurring or persistent issues that need to be monitored across development cycles until they are confirmed as resolved.
- **Tags:** bugs, tracking, issues, logging, node_modules, performance

## 1. Purpose

This artifact serves as a centralized list to track ongoing and recurring issues during the development of the Data Curation Environment (DCE) extension. This ensures that persistent problems are not forgotten and are actively monitored across cycles until a definitive solution is implemented and verified.

## 2. Active Issues

---

### Issue #1: Logging Visibility

-   **Symptom:** The custom "Data Curation Environment" output channel is not visible in the "OUTPUT" tab's dropdown menu in the Extension Development Host window. This prevents the primary logging mechanism from being used for debugging.
-   **First Reported:** Cycle 19
-   **Status (C20):** **Active.** The issue persists. The root cause is likely an error during extension activation that prevents the `LoggerService` or the `vscode.window.createOutputChannel` call from executing successfully.
-   **Next Steps (C20):** Add robust `try...catch` blocks with `console.error` logging (which appears in the **Debug Console**) around the service initialization in `extension.ts` to identify the point of failure.

---

### Issue #2: `node_modules` Exclusion and Performance

-   **Symptom:** The `node_modules` directory is included in file tree scans, leading to incorrect file and token counts and a significant performance delay ("Loading file tree..." takes a long time).
-   **First Reported:** Cycle 15 (and earlier)
-   **Status (C20):** **Active.** The exclusion pattern provided to `vscode.workspace.findFiles` in `fs.service.ts` has been ineffective so far.
-   **Next Steps (C20):** Refine the glob pattern to be more explicit (`'{**/node_modules/**, ...}'`) and add logging to the `fs.service.ts` to verify the list of files *after* the exclusion is applied to confirm if the issue is with the `findFiles` call itself or subsequent processing. Also, explicitly exclude the generated `flattened_repo.md` file.

---

### Issue #3: Incorrect Image Token Counting

-   **Symptom:** Image files (e.g., `.png`, `.jpg`) are being assigned a token count based on their file size, rather than being treated as having zero tokens. They should display their file size (e.g., "15 KB") instead of a token count.
-   **First Reported:** Cycle 18
-   **Status (C20):** **Active.** The logic in `fs.service.ts` to identify image files and set their `tokenCount` to 0 is not working as intended, or the frontend is not correctly interpreting the `isImage` flag.
-   **Next Steps (C20):** Add logging to the `getFileStats` method in `fs.service.ts` to trace how image files are processed. Review the rendering logic in `FileTree.tsx` to ensure it correctly handles the `isImage` flag and displays the `sizeInBytes` instead of `tokenCount`.

---

### Issue #4: File Tree Caching and Refresh Behavior

-   **Symptom:** The file tree reloads from scratch every time the user switches away from and back to the extension's tab, causing a long "Loading..." delay. Additionally, the tree does not automatically update when files are created or deleted on the file system (e.g., after running "Flatten Context").
-   **First Reported:** Cycle 19
-   **Status (C20):** **Active.** The frontend lacks a caching mechanism, and the backend lacks a file system watcher to push updates.
-   **Next Steps (C20):**
    1.  **Frontend:** Change the `useEffect` dependency array in `view.tsx` to `[]` to fetch the tree only once on initial load.
    2.  **Backend:** Implement a `FileSystemWatcher` in `fs.service.ts` to detect changes, invalidate the server-side cache, and push a "force refresh" message to the client.
</file>

<file path="src/Artifacts/A189. Number Formatting Reference Guide.md">
# Artifact A189: Number Formatting Guide (K/M Suffixes & Dynamic Decimals)
# Date Created: Cycle 14
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A standalone guide and utility script for formatting large numbers with K/M/B/T suffixes and dynamic decimal place adjustment for clean UI presentation.
- **Tags:** utility, script, formatting, numbers, ui, ux, javascript, typescript

## 1. Purpose

This artifact provides a set of robust, reusable TypeScript functions for formatting numbers in a user-friendly way. The core function, `formatLargeNumber`, intelligently converts large numbers into a compact format using suffixes like 'K' (thousands), 'M' (millions), 'B' (billions), and 'T' (trillions).

The key features of this utility are:
*   **Automatic Suffixing:** Automatically scales numbers and adds the appropriate suffix.
*   **Dynamic Decimal Precision:** Adjusts the number of decimal places shown based on the magnitude of the number, ensuring a clean and consistent look in the UI (e.g., `12.3K`, `123.5K`, `1.23M`).
*   **Handling of Small Numbers:** Gracefully handles numbers below 1,000 without applying a suffix.
*   **Specialized Wrappers:** Includes helper functions like `formatCurrency` and `formatCount` for common use cases.

## 2. Core Utility Functions (from `src/utils.ts`)

Below is the complete TypeScript code. You can save this as a `formatting.ts` file in a new project's `utils` directory.

```typescript
// src/common/utils/formatting.ts

const KMBT_SUFFIXES = ['', 'K', 'M', 'B', 'T', 'Q']; // Extend as needed

/**
 * Formats a large number with appropriate K/M/B/T suffixes and dynamic decimal places.
 * Handles very small near-zero numbers gracefully to avoid scientific notation.
 *
 * @param value The number to format.
 * @param decimalPlaces The base number of decimal places to aim for.
 * @returns A formatted string.
 */
export function formatLargeNumber(value: number | undefined | null, decimalPlaces: number = 2): string {
    if (value === null || value === undefined || isNaN(value) || !Number.isFinite(value)) {
        return '---';
    }
    if (value === 0) {
        return '0';
    }

    const VERY_SMALL_THRESHOLD = 1e-6; // 0.000001
    if (Math.abs(value) < VERY_SMALL_THRESHOLD) {
        return (0).toFixed(decimalPlaces);
    }

    const isNegative = value < 0;
    const absValue = Math.abs(value);

    let unitIndex = 0;
    let scaledValue = absValue;

    if (absValue < 1000) {
        return String(Math.round(value)); // Return whole number if less than 1000
    }

    if (absValue >= 1000) {
        unitIndex = Math.floor(Math.log10(absValue) / 3);
        unitIndex = Math.min(unitIndex, KMBT_SUFFIXES.length - 1);
        scaledValue = absValue / Math.pow(1000, unitIndex);
    }

    let adjustedDecimalPlaces = decimalPlaces;
    if (unitIndex > 0) { // If a suffix is used (K, M, B, T, Q)
        if (scaledValue >= 100) adjustedDecimalPlaces = Math.max(0, decimalPlaces - 2);
        else if (scaledValue >= 10) adjustedDecimalPlaces = Math.max(0, decimalPlaces - 1);
    } else { // No unit suffix (value < 1000)
        if (Math.abs(scaledValue) < 0.01 && scaledValue !== 0) {
            adjustedDecimalPlaces = Math.max(decimalPlaces, 4);
        } else if (Number.isInteger(scaledValue)) {
             adjustedDecimalPlaces = 0;
        }
    }

    const unit = KMBT_SUFFIXES[unitIndex] ?? '';
    let formattedValue = scaledValue.toFixed(adjustedDecimalPlaces);

    // Remove trailing .00 or .0
    if (adjustedDecimalPlaces > 0 && formattedValue.endsWith('0')) {
        formattedValue = formattedValue.replace(/\.?0+$/, '');
    }


    return `${isNegative ? '-' : ''}${formattedValue}${unit}`;
}```

## 3. Usage Examples

Here is how you can use these functions in your code:

```typescript
import { formatLargeNumber } from './path/to/formatting';

// formatLargeNumber examples
console.log(formatLargeNumber(123));        // "123"
console.log(formatLargeNumber(1234));       // "1.23K"
console.log(formatLargeNumber(12345));      // "12.3K"
console.log(formatLargeNumber(123456));     // "123K"
console.log(formatLargeNumber(1234567));    // "1.23M"
console.log(formatLargeNumber(9876543210)); // "9.88B"
console.log(formatLargeNumber(-54321));     // "-54.3K"
console.log(formatLargeNumber(0.0000001));  // "0.00"
```

## 4. Integration Guide

1.  **Copy the Code:** Save the code from Section 2 into a file named `formatting.ts` inside your project's `src/common/utils` directory.
2.  **Import and Use:** Import the function into your UI components.
    ```typescript
    import { formatLargeNumber } from '@/common/utils/formatting';

    const MyComponent = () => {
      const displayValue = formatLargeNumber(123456); // "123K"
      return <div>Tokens: {displayValue}</div>;
    };
    ```
</file>

<file path="src/Artifacts/A2. DCE - Phase 1 - Context Chooser - Requirements & Design.md">
# Artifact A2: DCE - Phase 1 - Context Chooser - Requirements & Design
# Date Created: Cycle 1
# Author: AI Model
# Updated on: Cycle 2 (Revised based on analysis of reference repository)

## 1. Overview

This document outlines the requirements for Phase 1 of the Data Curation Environment (DCE) project. The primary goal of this phase is to replace the manual, error-prone process of managing context via a `files_list.txt` with an intuitive, UI-driven approach within VS Code.

**Major Update (Cycle 2):** The analysis of the `The-Creator-AI-main` repository revealed an existing, highly-functional file tree component (`src/client/components/file-tree/FileTree.tsx`) with checkbox selection. The project requirements have been updated to reflect a shift from *building* this component from scratch to *analyzing, adapting, and integrating* the existing solution.

## 2. Functional Requirements

| ID | Requirement | User Story | Acceptance Criteria | Update (Cycle 2) |
|---|---|---|---|---|
| FR-01 | **Analyze Existing File Tree** | As a developer, I want to understand the capabilities of the `FileTree.tsx` component | - Analyze the component's props and state. <br> - Document its dependencies on other frontend components and backend services (`FSService`). <br> - Determine how checkbox state is managed and communicated. | **New** |
| FR-02 | **Display File Tree in View** | As a user, I want to see a tree of all files and folders in my workspace within a dedicated VS Code view. | - The view should accurately reflect the workspace's file system structure. <br> - It should respect `.gitignore` rules to hide irrelevant files. | **Adaptation.** The `FileTree.tsx` component and `FSService` already provide this. We need to ensure it's correctly instantiated in our extension's view. |
| FR-03 | **Checkbox Selection** | As a user, I want to select and deselect files and folders for my context using checkboxes. | - Every file and folder in the tree has a checkbox. <br> - Checking a folder checks all its children. <br> - Unchecking a folder unchecks all its children. <br> - A folder shows an "indeterminate" state if only some of its children are checked. | **Adaptation.** The reference component appears to support this logic. We must verify and adapt its state management (`selectedFiles` array). |
| FR-04 | **Flatten Selected Context** | As a user, I want a single button to package all my selected files into one context file. | - A "Flatten Context" button is present in the view. <br> - Clicking it triggers a process that reads the content of all checked files. <br> - The contents are concatenated into a single `flattened_repo.md` file in the project root. | **Implementation.** The logic for this will need to be implemented, using the state from the `FileTree` component as input for our enhanced `bootstrap-flattener.js` logic. |

## 3. Technical Design & Integration Plan

1.  **Extension View:** We will create a new Webview-based view in the VS Code activity bar, as defined in `package.json`.
2.  **Frontend Component:** This view will render the `Context.tsx` module (`src/client/modules/context.module/`), which in turn uses the `FileTree.tsx` component.
3.  **Backend Service:** The frontend will communicate with the `FSService.ts` on the extension's backend via the established IPC channels.
    -   On view load, the frontend sends a `RequestWorkspaceFiles` message.
    -   The `FSService` gathers the file list (respecting `.gitignore`), creates the tree structure, and sends it back via a `SendWorkspaceFiles` message.
4.  **State Management:** The list of selected file paths will be managed in the frontend's state store (`change-plan-view.store.ts`). The `FileTree.tsx` component will receive this list as a prop and use it to render the checkbox states. User interactions with checkboxes will dispatch actions to update this state.
5.  **Flattening Logic:**
    -   The "Flatten Context" button will trigger a new IPC message, `RequestFlattenContext`, sending the array of selected file paths to the backend.
    -   A new handler in the backend will receive this list, read the content of each file, and then use the logic from `bootstrap-flattener.js` to generate the final `flattened_repo.md` file.
</file>

<file path="src/Artifacts/A3. DCE - Technical Scaffolding Plan.md">
# Artifact A3: DCE - Technical Scaffolding Plan
# Date Created: Cycle 1
# Author: AI Model
# Updated on: Cycle 2 (Adopted architecture from `The-Creator-AI-main` repository)

## 1. Overview

This document outlines the technical scaffolding and file structure for the Data Curation Environment (DCE) VS Code extension.

**Major Update (Cycle 2):** The initial plan for a simple file structure has been superseded. We are officially adopting the mature and robust architecture of the `The-Creator-AI-main` reference repository as our project's blueprint. This provides a proven, scalable foundation for all three project phases.

## 2. Adopted File Structure

The project will adhere to the following directory structure, derived directly from the reference repository:

```
.
├── public/                     # Static assets for webviews (icons, css)
├── src/
│   ├── backend/                # Extension Host code (Node.js environment)
│   │   ├── commands/           # Command definitions and registration
│   │   ├── repositories/       # Data persistence logic (workspace state)
│   │   ├── services/           # Core backend services (LLM, FS, Git, etc.)
│   │   ├── types/              # TypeScript types for the backend
│   │   └── utils/              # Utility functions for the backend
│   │
│   ├── client/                 # Webview code (Browser environment)
│   │   ├── components/         # Generic, reusable React components (FileTree, Modal)
│   │   ├── modules/            # Feature-specific modules (Context, Plan)
│   │   ├── store/              # Global state management for webviews (RxJS)
│   │   └── views/              # Entry points for each webview panel
│   │
│   ├── common/                 # Code shared between backend and client
│   │   ├── constants/
│   │   ├── ipc/                # IPC channel definitions and managers
│   │   ├── types/              # Shared TypeScript types (FileNode)
│   │   └── utils/              # Shared utility functions (parse-json)
│   │
│   └── extension.ts            # Main entry point for the VS Code extension
│
├── package.json                # Extension manifest, dependencies, and scripts
├── tsconfig.json               # TypeScript configuration
├── webpack.config.js           # Webpack configuration for bundling client/server code
└── ... (config files like .eslintrc.json, .gitignore)
```

## 3. Key Architectural Concepts

-   **Separation of Concerns:** The structure strictly separates backend (Node.js) logic from frontend (React/webview) logic.
-   **Shared Code:** The `src/common/` directory is critical for sharing types and IPC definitions, ensuring type safety and consistency between the extension host and the webview.
-   **Service-Oriented Backend:** The `src/backend/services/` directory promotes modularity. Each service has a single responsibility (e.g., `FSService` for file operations, `LlmService` for AI interaction), making the system easier to maintain and test.
-   **Dependency Injection:** The `Services.ts` class acts as a simple injector, managing the instantiation and provision of backend services.
-   **Modular Frontend:** The `src/client/modules/` directory allows for building complex UIs by composing smaller, feature-focused modules.
-   **Component-Based UI:** The `src/client/components/` directory holds the fundamental building blocks of the UI, promoting reusability.
-   **Typed IPC Communication:** The use of `channels.enum.ts` and `channels.type.ts` in `src/common/ipc/` provides a strongly-typed and well-documented contract for communication between the webview and the extension host, reducing runtime errors.
</file>

<file path="src/Artifacts/A4. DCE - Analysis of The-Creator-AI Repo.md">
# Artifact A4: DCE - Analysis of The-Creator-AI Repo
# Date Created: Cycle 2
# Author: AI Model
- **Description:** Provides a detailed analysis of the `The-Creator-AI-main` reference repository, its architecture, and its mapping to the Data Curation Environment project goals.
- **Tags:** analysis, repository, architecture, vscode-extension, project-planning

## 1. Overview

The `The-Creator-AI-main` repository is a comprehensive and well-structured VS Code extension that functions as a sophisticated AI coding assistant. It utilizes a modern tech stack including TypeScript, React for webviews, and TailwindCSS for styling. Its architecture is service-oriented on the backend (extension host) and modular on the frontend (webview). The discovery of this repository provides a massive head-start for our project, as it contains pre-built solutions for many of our planned features.

## 2. Backend Architecture (Extension Host)

The backend, located primarily in `src/backend/`, follows a clean, service-oriented architecture.

-   **`extension.ts`**: The main entry point. It initializes services and registers the commands and webview providers.
-   **`services/`**: A directory containing distinct services for handling specific concerns:
    -   `LlmService.ts`: Manages interactions with multiple AI models (Gemini, OpenAI). It includes logic for API key management and prompt construction.
    -   `FSService.ts`: Handles all file system operations, including reading files, creating a file tree, and respecting `.gitignore`.
    -   `CodeService.ts`: Contains logic for applying code changes, parsing diffs, and generating code.
    -   `GitService.ts`: Provides an interface for Git operations, like committing changes.
    -   `MessageService.ts`: Orchestrates the flow of messages between the frontend and the LLM service.
    -   `PlanExImService.ts`: Manages exporting and importing of "Change Plans".
    -   `Services.ts`: A dependency injection container that initializes and provides access to all other services.
-   **`repositories/`**: Manages data persistence within the VS Code workspace state (e.g., `PersistentStoreRepository.ts`, `SettingsRepository.ts`).
-   **`commands/`**: Defines all the commands exposed by the extension in `package.json`.

## 3. Frontend Architecture (Webview)

The frontend, located in `src/client/`, is a React application bundled with Webpack.

-   **`views/`**: The application is divided into distinct views, each with its own entry point, state management, and logic (e.g., `change-plan.view`).
-   **`modules/`**: Contains reusable UI/logic modules that are composed into the main view, such as:
    -   `context.module/Context.tsx`: Renders the file explorer.
    -   `plan.module/Plan.tsx`: Handles displaying the AI-generated plan and user input.
-   **`components/`**: A collection of generic, reusable React components:
    -   `file-tree/FileTree.tsx`: A fully functional file tree component with checkbox selection, expansion state, and active file highlighting. This is directly applicable to our Phase 1 goal.
    -   `AutoResizingTextarea.tsx`, `Modal.tsx`, `ProgressSteps.tsx`: Other useful UI components.
-   **State Management**: Each view appears to have its own local store (`store/`), using RxJS `BehaviorSubject` for reactivity. This is a simple yet effective approach for managing state within a contained webview.
-   **IPC**: Communication with the backend is handled via a robust `ClientPostMessageManager` (`src/common/ipc/`) which defines clear channels for client-server interaction.

## 4. Mapping to DCE Project Goals

The reference repository provides solutions or strong foundations for all three of our project phases.

-   **Phase 1 (Context Chooser):** **Largely Complete.** The `FileTree.tsx` component in `src/client/components/file-tree/` combined with `FSService.ts` on the backend already provides the core functionality of a checkbox-based file explorer for context selection. Our work shifts from building this from scratch to adapting and integrating this existing, powerful component.

-   **Phase 2 (Parallel 'Co-pilot' Panel):** **Partially Complete.** The "Change Plan" view (`src/client/views/change-plan.view/`) is essentially a single "co-pilot" panel. It allows a user to describe a change, get an AI-generated plan, and interact with it. Our goal of *parallel* panels is not implemented, but the foundation for a single panel is incredibly strong.

-   **Phase 3 (Diff Tool):** **Not Present.** There is no integrated diff-viewing tool like WinMerge. However, the `CodeService.ts` *does* contain logic for parsing and applying diffs in a custom `<<<<<<< SEARCH` format, and the extension can trigger VS Code's native diff viewer (`git.openChange`).

## 5. Recommendations & Path Forward

1.  **Adopt the Architecture:** We should officially adopt the architecture of `The-Creator-AI-main` as the blueprint for our project. It is robust, scalable, and well-organized.
2.  **Focus on Adaptation:** Our immediate efforts for Phase 1 should be to isolate the `FileTree` component and its backend dependencies (`FSService.ts`) and ensure they can be used to generate the `flattened_repo.md` as originally specified.
3.  **De-risk Phase 2:** The "Change Plan" functionality is a perfect starting point for our parallel co-pilot. We should analyze its state management and IPC communication to understand how we might instantiate multiple, independent instances of it.
4.  **Update All Documentation:** All planning artifacts (`A1`, `A2`, `A3`) must be updated immediately to reflect this new context. Our plan has evolved from "build" to "analyze, adapt, and extend".
</file>

<file path="src/Artifacts/A5. DCE - Target File Structure.md">
# Artifact A5: DCE - Target File Structure
# Date Created: Cycle 3
# Author: AI Model

- **Description:** A text-based representation of the target file structure for the DCE extension, outlining the layout of directories and key files.
- **Tags:** file structure, architecture, project layout, scaffolding

## 1. Overview

This document provides a visual representation of the file structure that the `A6. DCE - Initial Scaffolding Deployment Script` will create. It is based on the robust and scalable architecture of the `The-Creator-AI-main` reference repository, as detailed in `A3. DCE - Technical Scaffolding Plan`.

## 2. File Tree

```
DCE/
├── .gitignore
├── .vscodeignore
├── package.json
├── tsconfig.json
├── webpack.config.js
├── public/
│   └── spiral.svg
└── src/
    ├── backend/
    │   ├── commands/
    │   │   ├── commands.ts
    │   │   └── register-commands.ts
    │   ├── repositories/
    │   │   └── persistent-store.repository.ts
    │   ├── services/
    │   │   ├── fs.service.ts
    │   │   ├── services.ts
    │   │   └── flattener.service.ts
    │   └── types/
    │       └── storage-keys.enum.ts
    │
    ├── client/
    │   ├── components/
    │   │   └── file-tree/
    │   │       ├── FileTree.tsx
    │   │       └── FileTree.utils.ts
    │   ├── views/
    │   │   ├── context-chooser.view/
    │   │   │   ├── index.ts
    │   │   │   ├── on-message.ts
    │   │   │   ├── view.scss
    │   │   │   └── view.tsx
    │   │   └── index.ts
    │   └── store/
    │       ├── store.ts
    │       └── useStore.ts
    │
    ├── common/
    │   ├── ipc/
    │   │   ├── channels.enum.ts
    │   │   ├── channels.type.ts
    │   │   ├── client-ipc.ts
    │   │   ├── get-vscode-api.ts
    │   │   └── server-ipc.ts
    │   ├── types/
    │   │   ├── file-node.ts
    │   │   └── vscode-webview.d.ts
    │   └── utils/
    │       └── view-html.ts
    │
    └── extension.ts
```
</file>

<file path="src/Artifacts/A6. DCE - Initial Scaffolding Deployment Script.md">
# Artifact A6: DCE - Initial Scaffolding Deployment Script
# Date Created: Cycle 3
# Author: AI Model
# Updated on: Cycle 10 (Fix problemMatcher in tasks.json to resolve F5 launch error)

- **Description:** Contains a Node.js script that, when executed, creates the entire initial directory structure and files for the DCE extension project.
- **Tags:** deployment, script, scaffolding, bootstrap, nodejs, automation

## 1. Overview

This artifact contains the `deploy_scaffold.js` script. Its purpose is to automate the creation of the initial project structure for the Data Curation Environment (DCE) VS Code extension. This eliminates the need for manual file creation and ensures a consistent setup based on our agreed-upon architecture, including the necessary configurations for debugging.

## 2. How to Use

1.  Save the code below as `deploy_scaffold.js` in your project's root directory (e.g., `C:\Projects\DCE\`).
2.  Open a terminal in that directory.
3.  Run the script using Node.js: `node deploy_scaffold.js`
4.  The script will create all the necessary directories and files, including the `.vscode` folder with `launch.json` and a corrected `tasks.json`, logging its progress to the console.

## 3. Script: `deploy_scaffold.js`

```javascript
const fs = require('fs').promises;
const path = require('path');

// --- File Content Definitions ---

const filesToCreate = [
    {
        path: 'package.json',
        content: `{
    "name": "data-curation-environment",
    "publisher": "DCE-Developer",
    "displayName": "Data Curation Environment",
    "description": "A VS Code extension for curating context for Large Language Models.",
    "version": "0.0.1",
    "engines": {
        "vscode": "^1.90.0"
    },
    "categories": [
        "Other"
    ],
    "activationEvents": [
        "onView:viewType.sidebar.contextChooser"
    ],
    "main": "./dist/extension.js",
    "contributes": {
        "viewsContainers": {
            "activitybar": [
                {
                    "id": "data-curation-environment",
                    "title": "Data Curation",
                    "icon": "public/spiral.svg"
                }
            ]
        },
        "views": {
            "data-curation-environment": [
                {
                    "type": "webview",
                    "id": "viewType.sidebar.contextChooser",
                    "name": "Context Chooser"
                }
            ]
        }
    },
    "scripts": {
        "vscode:prepublish": "npm run package",
        "compile": "webpack",
        "watch": "webpack --watch",
        "package": "webpack --mode production --devtool hidden-source-map",
        "lint": "eslint src --ext ts"
    },
    "devDependencies": {
        "@types/node": "18.x",
        "@types/vscode": "^1.90.0",
        "@typescript-eslint/eslint-plugin": "^7.7.1",
        "@typescript-eslint/parser": "^7.7.1",
        "eslint": "^8.57.0",
        "ts-loader": "^9.5.1",
        "typescript": "^5.4.5",
        "webpack": "^5.91.0",
        "webpack-cli": "^5.1.4",
        "copy-webpack-plugin": "^12.0.2",
        "style-loader": "^4.0.0",
        "css-loader": "^7.1.2",
        "sass-loader": "^16.0.1",
        "sass": "^1.78.0",
        "postcss-loader": "^8.1.1",
        "babel-loader": "^9.1.3",
        "@babel/preset-react": "^7.24.7",
        "@babel/preset-typescript": "^7.24.7",
        "process": "^0.11.10"
    },
    "dependencies": {
        "react": "^18.3.1",
        "react-dom": "^18.3.1",
        "react-icons": "^5.3.0",
        "rxjs": "^7.8.1",
        "reflect-metadata": "^0.2.2"
    }
}`
    },
    {
        path: 'tsconfig.json',
        content: `{
    "compilerOptions": {
        "module": "esnext",
        "moduleResolution": "node",
        "target": "ESNext",
        "lib": ["ES2022", "DOM"],
        "jsx": "react",
        "sourceMap": true,
        "rootDir": ".",
        "strict": false,
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"]
        },
        "experimentalDecorators": true,
        "allowSyntheticDefaultImports": true
    },
    "include": ["src/**/*"]
}`
    },
    {
        path: 'webpack.config.js',
        content: `const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');

/** @type {import('webpack').Configuration} */
const config = {
    target: 'node',
    mode: 'none',
    entry: {
        extension: './src/extension.ts',
        contextChooserView: './src/client/views/context-chooser.view/view.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    externals: {
        vscode: 'commonjs vscode'
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
        alias: {
            "@": path.resolve(__dirname, 'src'),
        }
    },
    module: {
        rules: [
            {
                test: /\\.ts$/,
                exclude: /node_modules/,
                use: [{ loader: 'ts-loader' }]
            },
            {
                test: /\\.?ts.?(x)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-typescript']
                    }
                }
            },
            {
                test: /\\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
            },
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: "public", to: "public" }],
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    devtool: 'nosources-source-map',
    infrastructureLogging: {
        level: "log",
    },
};
module.exports = [config];`
    },
    {
        path: '.gitignore',
        content: `node_modules
dist
out
*.vsix
.vscode-test/
.vscode/`
    },
    {
        path: '.vscodeignore',
        content: `node_modules
src
.gitignore
webpack.config.js
tsconfig.json
**/*.map
**/*.ts`
    },
    {
        path: '.vscode/launch.json',
        content: `{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Run Extension",
            "type": "extensionHost",
            "request": "launch",
            "args": ["--extensionDevelopmentPath=\${workspaceFolder}"],
            "outFiles": ["\${workspaceFolder}/dist/**/*.js"],
            "preLaunchTask": "npm: watch"
        }
    ]
}`
    },
    {
        path: '.vscode/tasks.json',
        content: `{
    "version": "2.0.0",
    "tasks": [
        {
            "type": "npm",
            "script": "watch",
            "isBackground": true,
            "presentation": {
                "reveal": "never"
            },
            "group": {
                "kind": "build",
                "isDefault": true
            },
            "problemMatcher": {
                "base": "$ts-webpack-watch",
                "background": {
                    "activeOnStart": true,
                    "beginsPattern": "Compilation starting...",
                    "endsPattern": "compiled successfully"
                }
            }
        }
    ]
}`
    },
    {
        path: 'public/spiral.svg',
        content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <g id="Page-1" stroke="none" fill="none" fill-rule="evenodd">
        <g id="dep" transform="translate(4, 6)">
            <path d="M100 100 m 0 -80 a 80 80 0 0 1 0 160 a 70 70 0 0 1 0 -140 a 60 60 0 0 1 0 120 a 50 50 0 0 1 0 -100 a 40 40 0 0 1 0 80 a 30 30 0 0 1 0 -60 a 20 20 0 0 1 0 40"
                fill="none" stroke="white" stroke-width="8" id="Shape" />
        </g>
    </g>
</svg>`
    },
    {
        path: 'src/extension.ts',
        content: `import * as vscode from "vscode";
import { registerViews } from "./client/views";
import { registerCommands } from "./backend/commands/register-commands";
import { Services } from "./backend/services/services";

let globalContext: vscode.ExtensionContext | null = null;

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "Data Curation Environment" is now active!');
    globalContext = context;

    Services.initialize();
    registerCommands(context);
    registerViews(context);
}

export function getContext() {
    if (!globalContext) {
        throw new Error("Extension context not available.");
    }
    return globalContext;
}

export function deactivate() {}`
    },
    {
        path: 'src/common/types/file-node.ts',
        content: `export interface FileNode {
    name: string;
    absolutePath: string;
    children?: FileNode[];
}`
    },
    {
        path: 'src/common/types/vscode-webview.d.ts',
        content: `export interface WebviewApi<StateType> {
    postMessage(message: unknown): void;
    getState(): StateType | undefined;
    setState<T extends StateType | undefined>(newState: T): T;
}

declare global {
    function acquireVsCodeApi<StateType = unknown>(): WebviewApi<StateType>;
}`
    },
    {
        path: 'src/common/ipc/channels.enum.ts',
        content: `export enum ClientToServerChannel {
    RequestFlattenContext = "clientToServer.requestFlattenContext",
    RequestWorkspaceFiles = "clientToServer.requestWorkspaceFiles",
}

export enum ServerToClientChannel {
    SendWorkspaceFiles = "serverToClient.sendWorkspaceFiles",
}`
    },
    {
        path: 'src/common/ipc/channels.type.ts',
        content: `import { FileNode } from "@/common/types/file-node";
import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";

export type ChannelBody<T extends ClientToServerChannel | ServerToClientChannel> =
    T extends ClientToServerChannel.RequestFlattenContext ? { selectedPaths: string[] } :
    T extends ClientToServerChannel.RequestWorkspaceFiles ? {} :
    T extends ServerToClientChannel.SendWorkspaceFiles ? { files: FileNode[] } :
    never;`
    },
    {
        path: 'src/common/ipc/get-vscode-api.ts',
        content: `import { WebviewApi } from "../types/vscode-webview";

let vscode: WebviewApi<unknown> | null = null;

const getVscode = () => {
    if (!vscode) {
        vscode = acquireVsCodeApi();
    }
    return vscode;
};

export default getVscode;`
    },
    {
        path: 'src/common/ipc/client-ipc.ts',
        content: `import getVscode from "./get-vscode-api";
import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";
import { ChannelBody } from "./channels.type";

export class ClientPostMessageManager {
    private static _instance?: ClientPostMessageManager;
    private _listeners: {
        channel: ServerToClientChannel,
        callback: (body: ChannelBody<ServerToClientChannel>) => void
    }[];

    private constructor() {
        this._listeners = [];
        window.addEventListener('message', (event: MessageEvent) => {
            const data = event.data;
            this._listeners.forEach((listener) => {
                if (listener.channel === data.channel) {
                    listener.callback(data.body);
                }
            });
        });
    }

    static getInstance(): ClientPostMessageManager {
        if (!ClientPostMessageManager._instance) {
            ClientPostMessageManager._instance = new ClientPostMessageManager();
        }
        return ClientPostMessageManager._instance;
    }

    sendToServer<T extends ClientToServerChannel>(channel: T, body: ChannelBody<T>): void {
        getVscode().postMessage({ channel, body });
    }

    onServerMessage<T extends ServerToClientChannel>(channel: T, callback: (body: ChannelBody<T>) => void): void {
        this._listeners.push({ channel, callback: callback as any });
    }
}`
    },
    {
        path: 'src/common/ipc/server-ipc.ts',
        content: `import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";
import { ChannelBody } from "./channels.type";

export class ServerPostMessageManager {
    private static _instance?: ServerPostMessageManager;
    private _listeners: {
        channel: ClientToServerChannel,
        callback: (body: ChannelBody<ClientToServerChannel>) => void
    }[];

    private constructor(
        private onMessage: (data: any) => void,
        private sendMessage: (message: any) => void
    ) {
        this._listeners = [];
        this.onMessage((data: any) => {
            this._listeners.forEach((listener) => {
                if (listener.channel === data.channel) {
                    listener.callback(data.body);
                }
            });
        });
    }

    static getInstance(onMessage?: (data: any) => void, sendMessage?: (message: any) => void) {
        if (onMessage && sendMessage) {
            ServerPostMessageManager._instance = new ServerPostMessageManager(onMessage, sendMessage);
        }
        if (!ServerPostMessageManager._instance) {
            throw new Error("ServerPostMessageManager not initialized");
        }
        return ServerPostMessageManager._instance;
    }

    sendToClient<T extends ServerToClientChannel>(channel: T, body: ChannelBody<T>): void {
        this.sendMessage({ channel, body });
    }

    onClientMessage<T extends ClientToServerChannel>(channel: T, callback: (body: ChannelBody<T>) => void): void {
        this._listeners.push({ channel, callback: callback as any });
    }
}`
    },
    {
        path: 'src/common/utils/view-html.ts',
        content: `import * as vscode from "vscode";

export function getViewHtml({ webview, nonce, scriptUri }: { webview: vscode.Webview; nonce: string; scriptUri: string; }): string {
    return \`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src \${webview.cspSource} 'unsafe-inline'; script-src 'nonce-\${nonce}';">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
            <div id="root"></div>
            <script nonce="\${nonce}" src="\${scriptUri}"></script>
        </body>
        </html>\`;
}

function getNonce() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
export { getNonce };`
    },
    {
        path: 'src/client/views/index.ts',
        content: `import { viewConfig as contextChooserViewConfig } from "./context-chooser.view";
import * as vscode from "vscode";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { getNonce, getViewHtml } from "@/common/utils/view-html";

export const views = [contextChooserViewConfig];
export const serverIPCs: Record<string, ServerPostMessageManager> = {};

export function registerViews(context: vscode.ExtensionContext) {
    views.forEach((viewConfig) => {
        context.subscriptions.push(
            vscode.window.registerWebviewViewProvider(viewConfig.type, {
                resolveWebviewView: (webviewView) => {
                    webviewView.webview.options = {
                        enableScripts: true,
                        localResourceRoots: [context.extensionUri],
                    };
                    const nonce = getNonce();
                    webviewView.webview.html = getViewHtml({
                        webview: webviewView.webview,
                        nonce,
                        scriptUri: webviewView.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "dist", viewConfig.entry)).toString(),
                    });
                    const serverIpc = ServerPostMessageManager.getInstance(
                        webviewView.webview.onDidReceiveMessage,
                        (data: any) => webviewView.webview.postMessage(data)
                    );
                    serverIPCs[viewConfig.type] = serverIpc;
                    viewConfig.handleMessage(serverIpc);
                },
            })
        );
    });
}`
    },
    {
        path: 'src/client/views/context-chooser.view/index.ts',
        content: `import { onMessage } from "./on-message";

export const viewConfig = {
    entry: "contextChooserView.js",
    type: "viewType.sidebar.contextChooser",
    handleMessage: onMessage,
};`
    },
    {
        path: 'src/client/views/context-chooser.view/on-message.ts',
        content: `import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { ClientToServerChannel } from "@/common/ipc/channels.enum";
import { Services } from "@/backend/services/services";

export function onMessage(serverIpc: ServerPostMessageManager) {
    const fsService = Services.fsService;
    const flattenerService = Services.flattenerService;

    serverIpc.onClientMessage(ClientToServerChannel.RequestWorkspaceFiles, () =>
        fsService.handleWorkspaceFilesRequest(serverIpc)
    );

    serverIpc.onClientMessage(ClientToServerChannel.RequestFlattenContext, (data) => {
        console.log("Flattening context for paths:", data.selectedPaths);
        flattenerService.flatten(data.selectedPaths);
    });
}`
    },
    {
        path: 'src/client/views/context-chooser.view/view.tsx',
        content: `import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import { FileNode } from '@/common/types/file-node';
import FileTree from '../../components/file-tree/FileTree';
import { useState, useEffect } from 'react';

const App = () => {
    const [files, setFiles] = useState<FileNode[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [activeFile, setActiveFile] = useState<string | undefined>();
    
    const clientIpc = ClientPostMessageManager.getInstance();

    useEffect(() => {
        clientIpc.sendToServer(ClientToServerChannel.RequestWorkspaceFiles, {});

        const handleFileResponse = ({ files: receivedFiles }: { files: FileNode[] }) => {
            setFiles(receivedFiles);
        };
        clientIpc.onServerMessage(ServerToClientChannel.SendWorkspaceFiles, handleFileResponse);

    }, [clientIpc]);

    const handleFileClick = (filePath: string) => {
        setActiveFile(filePath);
    };

    const updateSelectedFiles = (newSelectedFiles: string[]) => {
        setSelectedFiles(newSelectedFiles);
    };

    const handleFlattenClick = () => {
        clientIpc.sendToServer(ClientToServerChannel.RequestFlattenContext, { selectedPaths: selectedFiles });
    };

    return (
        <div className="view-container">
            <div className="view-header">
                <button className="flatten-button" onClick={handleFlattenClick}>
                    Flatten Context
                </button>
            </div>
            <div className="file-tree-container">
                {files.length > 0 ? (
                    files.map((rootNode, index) => (
                        <FileTree
                            key={index}
                            data={[rootNode]}
                            onFileClick={handleFileClick}
                            selectedFiles={selectedFiles}
                            updateSelectedFiles={updateSelectedFiles}
                            activeFile={activeFile}
                        />
                    ))
                ) : (
                    <div className="loading-message">Loading file tree...</div>
                )}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);`
    },
    {
        path: 'src/client/views/context-chooser.view/view.scss',
        content: `body {
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 13px;
    color: var(--vscode-editor-foreground);
    background-color: var(--vscode-sideBar-background);
}

.view-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.view-header {
    padding: 8px;
    border-bottom: 1px solid var(--vscode-panel-border);
}

.flatten-button {
    width: 100%;
    padding: 6px;
    border: 1px solid var(--vscode-button-border, var(--vscode-focusBorder));
    background-color: var(--vscode-button-background);
    color: var(--vscode-button-foreground);
    cursor: pointer;
    border-radius: 2px;
}

.flatten-button:hover {
    background-color: var(--vscode-button-hoverBackground);
}

.file-tree-container {
    padding: 5px;
    flex-grow: 1;
    overflow-y: auto;
}

.loading-message {
    padding: 8px;
    color: var(--vscode-descriptionForeground);
}

.tree-view ul {
    padding-left: 0;
    list-style-type: none;
    margin: 0;
}

.treenode-li {
    padding-left: 20px;
    position: relative;
}

.treenode-item-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 1px 4px;
    border-radius: 3px;
}

.treenode-item-wrapper:hover {
    background-color: var(--vscode-list-hoverBackground);
}

.treenode-chevron {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%) rotate(0deg);
    transition: transform 0.1s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
}

.treenode-chevron.expanded {
    transform: translateY(-50%) rotate(90deg);
}

.file-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1px;
}

.file-item.active {
    background-color: var(--vscode-list-activeSelectionBackground);
    color: var(--vscode-list-activeSelectionForeground);
}

.file-checkbox {
    margin-right: 6px;
    cursor: pointer;
}

.file-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}`
    },
    {
        path: 'src/backend/commands/commands.ts',
        content: `// No commands are needed for now, but we'll keep the file for future use.
export const commands = [];`
    },
    {
        path: 'src/backend/commands/register-commands.ts',
        content: `import * as vscode from "vscode";
import { commands } from "./commands";

export function registerCommands(context: vscode.ExtensionContext) {
    commands.forEach(({ commandId, callback }) => {
        let disposable = vscode.commands.registerCommand(commandId, callback);
        context.subscriptions.push(disposable);
    });
}`
    },
    {
        path: 'src/backend/services/services.ts',
        content: `import "reflect-metadata";
import { FSService } from "./fs.service";
import { FlattenerService } from "./flattener.service";

// A simple container for services
class ServiceContainer {
    public fsService = new FSService();
    public flattenerService = new FlattenerService();
    
    public initialize() {
        // This can be used for service initialization logic in the future
    }
}

export const Services = new ServiceContainer();`
    },
    {
        path: 'src/backend/services/fs.service.ts',
        content: `import * as vscode from "vscode";
import * as path from "path";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { ServerToClientChannel } from "@/common/ipc/channels.enum";
import { FileNode } from "@/common/types/file-node";

export class FSService {
    public async handleWorkspaceFilesRequest(serverIpc: ServerPostMessageManager) {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: [] });
            return;
        }
        
        // For simplicity, we'll just use the first workspace folder.
        const rootUri = workspaceFolders.uri;
        if (!rootUri) {
            // This case is unlikely if the above check passes, but good for safety.
            serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: [] });
            return;
        }
        const rootPath = rootUri.fsPath;
        const files = await vscode.workspace.findFiles("**/*");
        const fileTree = this.createFileTree(rootPath, files);

        serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: [fileTree] });
    }

    private createFileTree(rootPath: string, files: vscode.Uri[]): FileNode {
        const rootNode: FileNode = {
            name: path.basename(rootPath),
            absolutePath: rootPath,
            children: []
        };

        for (const file of files) {
            const relativePath = path.relative(rootPath, file.fsPath);
            const parts = relativePath.split(path.sep);
            let currentNode = rootNode;

            for (let i = 0; i < parts.length; i++) {
                const part = parts[i];
                let childNode = currentNode.children?.find(c => c.name === part);

                if (!childNode) {
                    const newPath = path.join(currentNode.absolutePath, part);
                    childNode = { name: part, absolutePath: newPath };
                    if (i < parts.length - 1) {
                        childNode.children = [];
                    }
                    currentNode.children?.push(childNode);
                }
                currentNode = childNode;
            }
        }
        return rootNode;
    }
}`
    },
    {
        path: 'src/client/components/Checkbox.tsx',
        content: `import React from "react";
import { useEffect, useRef } from "react";

interface CheckboxProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange'> {
    checked: boolean;
    indeterminate?: boolean;
    onChange: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = (props: CheckboxProps) => {
    const { checked, onChange, indeterminate, ...rest } = props;
    const cRef = useRef<any>(null);

    useEffect(() => {
        if (cRef.current) {
            cRef.current.indeterminate = indeterminate;
        }
    }, [cRef, indeterminate]);

    return (
        <input type="checkbox" ref={cRef} checked={checked} onChange={(e) => onChange(e.target.checked, e)} {...rest} />
    );
};

export default Checkbox;`
    },
        {
        path: 'src/client/components/file-tree/FileTree.tsx',
        content: `import React, { useEffect, useState } from 'react';
import TreeView from '../tree-view/TreeView';
import { FileNode } from '@/common/types/file-node';
import { addRemovePathInSelectedFiles, getFileNodeByPath } from './FileTree.utils';
import Checkbox from '../Checkbox';

interface FileTreeProps {
  data: FileNode[];
  onFileClick?: (filePath: string) => void;
  selectedFiles: string[];
  activeFile?: string;
  updateSelectedFiles: (selectedFiles: string[]) => void;
}

const FileTree: React.FC<FileTreeProps> = ({
  data,
  onFileClick,
  selectedFiles,
  activeFile,
  updateSelectedFiles,
}) => {

  const rootNode = data.length > 0 ? data : null;

  const [expandedNodes, setExpandedNodes] = useState<string[]>(rootNode ? [rootNode.absolutePath] : []);

  useEffect(() => {
    const toExpand = new Set<string>();
    selectedFiles?.forEach((selectedFile) => {
        const node = getFileNodeByPath(data, selectedFile);
        if (node && node.children) {
            toExpand.add(node.absolutePath);
        }
    });

    setExpandedNodes(prevExpandedNodes => [...new Set([...prevExpandedNodes, ...Array.from(toExpand)])]);
  }, [selectedFiles, data]);

  const handleNodeClick = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, node: FileNode) => {
    if (e && (e.target as HTMLElement)?.closest('.file-checkbox')) {
        return;
    }
    onFileClick && onFileClick(node.absolutePath);
  };

  const renderCheckbox = (path: string) => {
    const isSelected = selectedFiles.includes(path);
    const hasSelectedAncestor = selectedFiles.some(ancestor => path.startsWith(ancestor) && path !== ancestor);
    const hasSelectedDescendant = selectedFiles.some(descendant => descendant.startsWith(path) && descendant !== path);
    
    return (
      <Checkbox
        className="file-checkbox"
        indeterminate={!isSelected && !hasSelectedAncestor && hasSelectedDescendant}
        checked={isSelected || hasSelectedAncestor}
        onChange={(_, e) => handleFileCheckboxChange(e, path)}
      />
    );
  };

  const handleFileCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, path: string) => {
    e.stopPropagation();
    e.preventDefault();
    updateSelectedFiles(addRemovePathInSelectedFiles(data, path, selectedFiles));
  };

  const renderFileNodeContent = (node: FileNode) => {
    const isActive = activeFile === node.absolutePath;
    const isDirectory = Array.isArray(node.children);

    return (
      <div
        className={\`file-item \${isActive ? 'active' : ''} \${isDirectory ? 'directory' : 'file'}\`}
        onClick={(e) => handleNodeClick(e, node)}
      >
        {renderCheckbox(node.absolutePath)}
        <span className="file-name">{node.name}</span>
      </div>
    );
  };

  return (
    <div className="file-tree">
      <TreeView 
        data={data} 
        renderNodeContent={renderFileNodeContent} 
      />
    </div>
  );
};

export default FileTree;`
    },
    {
        path: 'src/client/components/file-tree/FileTree.utils.ts',
        content: `import { FileNode } from "@/common/types/file-node";

function getAllDescendantPaths(node: FileNode): string[] {
    let paths: string[] = [];
    if (node.children) {
        for (const child of node.children) {
            paths.push(child.absolutePath);
            paths = paths.concat(getAllDescendantPaths(child));
        }
    }
    return paths;
}

export const addRemovePathInSelectedFiles = (
  fileTree: FileNode[],
  path: string,
  selectedFiles: string[]
): string[] => {
    const node = getFileNodeByPath(fileTree, path);
    if (!node) return selectedFiles;

    const descendantPaths = getAllDescendantPaths(node);
    const isSelected = selectedFiles.includes(path);
    const hasSelectedAncestor = selectedFiles.some(ancestor => path.startsWith(ancestor) && path !== ancestor);
    
    let newSelectedFiles = [...selectedFiles];

    if (isSelected) {
        // Uncheck: remove this path and all its descendants
        newSelectedFiles = newSelectedFiles.filter(p => p !== path && !descendantPaths.includes(p));
    } else if (hasSelectedAncestor) {
        // Uncheck a child of an already checked folder.
        // 1. Remove the ancestor.
        // 2. Add all children of the ancestor EXCEPT the one that was unchecked.
        const ancestor = selectedFiles.find(ancestor => path.startsWith(ancestor) && path !== ancestor)!;
        const ancestorNode = getFileNodeByPath(fileTree, ancestor)!;
        
        newSelectedFiles = newSelectedFiles.filter(p => p !== ancestor);
        
        const siblingsAndCousins = getAllDescendantPaths(ancestorNode).filter(p => p !== path && !p.startsWith(path));
        newSelectedFiles.push(...siblingsAndCousins);

    } else {
        // Check: remove all descendants that might be individually selected, then add the parent path.
        newSelectedFiles = newSelectedFiles.filter(p => !p.startsWith(path));
        newSelectedFiles.push(path);
    }
  
  return [...new Set(newSelectedFiles)]; // Remove duplicates for cleanliness
};

export const getFileNodeByPath = (
  fileNodes: FileNode[],
  filePath: string
): FileNode | null => {
    for (const rootNode of fileNodes) {
        const found = findNode(rootNode, filePath);
        if (found) return found;
    }
    return null;
};

function findNode(node: FileNode, filePath: string): FileNode | null {
    if (node.absolutePath === filePath) {
        return node;
    }
    if (node.children && filePath.startsWith(node.absolutePath)) {
        for (const child of node.children) {
            const found = findNode(child, filePath);
            if(found) return found;
        }
    }
    return null;
}`
    },
    {
        path: 'src/client/components/tree-view/TreeView.tsx',
        content: `import React, { useState } from 'react';
import { MdChevronRight } from 'react-icons/md';
import { getExpandedNodes } from './TreeView.utils';

export interface TreeNode {
    name: string;
    absolutePath: string;
    children?: TreeNode[];
    isExpanded?: boolean;
    [key: string]: any;
}

interface TreeViewProps {
    data: TreeNode[];
    onNodeClick?: (node: TreeNode) => void;
    renderNodeContent?: (node: TreeNode) => React.ReactNode;
}

const TreeView: React.FC<TreeViewProps> = ({ data, onNodeClick, renderNodeContent }) => {
    const [expandedNodes, setExpandedNodes] = useState<string[]>(getExpandedNodes(data));

    const handleNodeClick = (node: TreeNode) => {
        if (node.children && node.children.length > 0) {
            setExpandedNodes((prevExpandedNodes) => {
                const isExpanded = prevExpandedNodes.includes(node.absolutePath);
                return isExpanded
                    ? prevExpandedNodes.filter((n) => n !== node.absolutePath)
                    : [...prevExpandedNodes, node.absolutePath];
            });
        }
        onNodeClick && onNodeClick(node);
    };

    const renderTreeNodes = (nodes: TreeNode[]) => {
        return nodes.map((node) => {
            const isExpanded = expandedNodes.includes(node.absolutePath);
            const isDirectory = !!(node.children && node.children.length > 0);

            return (
                <li key={node.absolutePath} className="treenode-li">
                    <div
                        onClick={() => handleNodeClick(node)}
                        className={\`treenode-item-wrapper\`}
                    >
                        {isDirectory && (
                            <span
                                className={\`treenode-chevron \${isExpanded ? 'expanded' : ''}\`}
                            >
                                <MdChevronRight />
                            </span>
                        )}
                        {renderNodeContent ? renderNodeContent(node) : node.name}
                    </div>
                    {isDirectory && isExpanded && (
                        <ul className="treenode-children">{renderTreeNodes(node.children)}</ul>
                    )}
                </li>
            );
        });
    };

    return (
        <div className="tree-view">
            <ul>{renderTreeNodes(data)}</ul>
        </div>
    );
};

export default TreeView;`
    },
    {
        path: 'src/client/components/tree-view/TreeView.utils.ts',
        content: `import { TreeNode } from "./TreeView";

export const getExpandedNodes = (data: TreeNode[]): string[] => {
  return data.reduce((acc: string[], node) => {
    if (node.isExpanded) {
      acc.push(node.absolutePath);
    }
    if (node.children) {
      acc.push(...getExpandedNodes(node.children));
    }
    return acc;
  }, []);
};`
    },
    {
        path: 'src/backend/services/flattener.service.ts',
        content: `import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs/promises';

interface FileStats {
    filePath: string;
    lines: number;
    characters: number;
    tokens: number;
    content: string;
    error: string | null;
}

export class FlattenerService {

    public async flatten(selectedPaths: string[]) {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            vscode.window.showErrorMessage("Cannot flatten context: No workspace folder is open.");
            return;
        }
        if (selectedPaths.length === 0) {
            vscode.window.showWarningMessage("Cannot flatten context: No files or folders are selected.");
            return;
        }

        const rootPath = workspaceFolders.uri.fsPath;
        const outputFilePath = path.join(rootPath, 'flattened_repo.md');

        try {
            const allFilePaths = await this.expandDirectories(selectedPaths);
            const uniqueFilePaths = [...new Set(allFilePaths)];

            const fileStatsPromises = uniqueFilePaths.map(filePath => this.getFileStatsAndContent(filePath));
            const results = await Promise.all(fileStatsPromises);

            const outputContent = this.generateOutputContent(results, rootPath, outputFilePath);

            await fs.writeFile(outputFilePath, outputContent, 'utf-8');
            vscode.window.showInformationMessage(\`Successfully flattened \${results.filter(r => !r.error).length} files to flattened_repo.md.\`);

        } catch (error: any) {
            vscode.window.showErrorMessage(\`Failed to flatten context: \${error.message}\`);
            console.error(error);
        }
    }

    private async expandDirectories(paths: string[]): Promise<string[]> {
        const allFiles: string[] = [];
        for (const p of paths) {
            try {
                const stats = await fs.stat(p);
                if (stats.isDirectory()) {
                    allFiles.push(...await this.getAllFilesRecursive(p));
                } else {
                    allFiles.push(p);
                }
            } catch (e) {
                console.warn(\`Could not stat path \${p}, skipping.\`);
            }
        }
        return allFiles;
    }

    private async getAllFilesRecursive(dirPath: string): Promise<string[]> {
        let files: string[] = [];
        try {
            const entries = await fs.readdir(dirPath, { withFileTypes: true });
            for (const entry of entries) {
                const fullPath = path.join(dirPath, entry.name);
                if (entry.isDirectory()) {
                    files = files.concat(await this.getAllFilesRecursive(fullPath));
                } else {
                    files.push(fullPath);
                }
            }
        } catch (e) {
            console.error(\`Error reading directory \${dirPath}:\`, e);
        }
        return files;
    }

    private async getFileStatsAndContent(filePath: string): Promise<FileStats> {
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            const lines = content.split('\\n').length;
            const characters = content.length;
            const tokens = Math.ceil(characters / 4);
            return { filePath, lines, characters, tokens, content, error: null };
        } catch (error: any) {
            return { filePath, lines: 0, characters: 0, tokens: 0, content: '', error: error.message };
        }
    }

    private generateOutputContent(results: FileStats[], rootDir: string, outputFilename: string): string {
        let totalLines = 0;
        let totalCharacters = 0;
        let totalTokens = 0;
        let errorCount = 0;
        const validResults = results.filter(r => !r.error);

        for (const res of validResults) {
            totalLines += res.lines;
            totalCharacters += res.characters;
            totalTokens += res.tokens;
        }

        let output = \`<!--\\n\`;
        output += \`  File: \${path.basename(outputFilename)}\\n\`;
        output += \`  Source Directory: \${rootDir}\\n\`;
        output += \`  Date Generated: \${new Date().toISOString()}\\n\`;
        output += \`  ---\\n\`;
        output += \`  Total Files: \${validResults.length}\\n\`;
        if (errorCount > 0) {
            output += \`  Files with Errors: \${errorCount}\\n\`;
        }
        output += \`  Total Lines: \${totalLines}\\n\`;
        output += \`  Total Characters: \${totalCharacters}\\n\`;
        output += \`  Approx. Tokens: \${totalTokens}\\n\`;
        output += \`-->\\n\\n\`;

        const top10 = [...validResults].sort((a, b) => b.tokens - a.tokens).slice(0, 10);

        output += \`<!-- Top 10 Files by Token Count -->\\n\`;
        top10.forEach((r, i) => {
            output += \`\${i + 1}. \${path.relative(rootDir, r.filePath)} (\${r.tokens} tokens)\\n\`;
        });
        output += \`\\n\`;

        output += \`<!-- Full File List -->\\n\`;
        results.forEach((r, i) => {
            const relativePath = path.relative(rootDir, r.filePath);
            if (r.error) {
                output += \`\${i + 1}. \${relativePath} - ERROR: \${r.error}\\n\`;
            } else {
                output += \`\${i + 1}. \${relativePath} - Lines: \${r.lines} - Chars: \${r.characters} - Tokens: \${r.tokens}\\n\`;
            }
        });
        output += \`\\n\`;

        for (const { filePath, content, error } of results) {
            const relativePath = path.relative(rootDir, filePath).replace(/\\\\/g, '/');
            output += \`<file path="\${relativePath}">\\n\`;
            if (error) {
                output += \`Error reading file: \${error}\\n\`;
            } else {
                output += content;
            }
            if (!content.endsWith('\\n')) {
                output += '\\n';
            }
            output += \`</file>\\n\\n\`;
        }
        return output;
    }
}`
    }
];

// --- Main Execution ---

async function deployScaffold() {
    console.log('Starting scaffold deployment...');
    const rootDir = process.cwd();

    for (const file of filesToCreate) {
        const fullPath = path.join(rootDir, file.path);
        const dir = path.dirname(fullPath);

        try {
            await fs.mkdir(dir, { recursive: true });
            await fs.writeFile(fullPath, file.content, 'utf-8');
            console.log(\`✅ Created: \${file.path}\`);
        } catch (error) {
            console.error(\`❌ Failed to create \${file.path}: \${error.message}\`);
        }
    }

    console.log('\\n🚀 Scaffold deployment complete! 🚀');
    console.log('Next steps:');
    console.log('1. Run `npm install` to install dependencies.');
    console.log('2. Press F5 in VS Code to start the extension (this will also run `npm run watch`).');
}

deployScaffold();
```
</file>

<file path="src/Artifacts/A7. DCE - Development and Testing Guide.md">
# Artifact A7: DCE - Development and Testing Guide
# Date Created: Cycle 7
# Author: AI Model
# Updated on: Cycle 9 (Revised workflow to use integrated debugger configuration)

- **Description:** A step-by-step guide explaining how to run, debug, and test the DCE extension within VS Code using the Extension Development Host.
- **Tags:** development, testing, debugging, workflow, vs code extension, f5, launch.json

## 1. Purpose

This guide provides the correct and simplified procedure for running and testing the Data Curation Environment (DCE) extension locally. Following these steps is crucial to see your changes and the extension's UI in action.

## 2. The Core Concept: The Extension Development Host

You cannot see the extension's UI (like the spiral icon or the custom panel) in the same VS Code window where you are writing the code. Instead, you must launch a special, separate VS Code window called the **Extension Development Host**. This new window has your extension installed and running, allowing you to test it as a user would.

Our project now includes the necessary `.vscode/launch.json` and `.vscode/tasks.json` files to make this process seamless.

## 3. Step-by-Step Workflow

Follow these steps every time you want to test the extension:

### Step 1: Open the "Run and Debug" View

In your main project window (e.g., `C:\Projects\DCE`), navigate to the "Run and Debug" panel in the activity bar on the left. The icon looks like a play button with a bug on it.

### Step 2: Launch the Extension

At the top of the "Run and Debug" panel, you will see a dropdown menu. It should already have **"Run Extension"** selected.

Simply press the **F5** key or click the green play button next to the "Run Extension" dropdown.

This single action will now:
1.  Automatically start the `npm run watch` task in the background to compile your code.
2.  Launch the new **"[Extension Development Host]"** VS Code window.

### Step 3: Find the Extension UI

In the newly opened **Extension Development Host** window, look at the activity bar on the far left. You should now see our spiral icon. Clicking this icon will open the "Context Chooser" panel, where you'll see the file tree with checkboxes.

### Step 4: Making and Viewing Changes

1.  **Make Code Changes:** Edit the source code in your **original** project window.
2.  **Auto-Compile:** When you save a file, the `npm run watch` task (which was started automatically) will recompile it. You can see its progress in the terminal panel of your original window.
3.  **Reload the Host:** To see your changes, go to the **Extension Development Host** window (the one you launched with F5) and reload it. The easiest way is to open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and run the command **`Developer: Reload Window`**.

You only need to stop the debugger (Shift+F5) and restart it (F5) if you make changes to configuration files like `package.json`. For all other code changes, simply reloading the host window is sufficient and much faster.
</file>

<file path="src/Artifacts/A8. DCE - Phase 1 - Selection Sets Feature Plan.md">
# Artifact A8: DCE - Phase 1 - Selection Sets Feature Plan
# Date Created: Cycle 11
# Author: AI Model

- **Description:** A plan outlining the user stories, UI/UX, and technical implementation for saving and loading different sets of selected files (selection profiles).
- **Tags:** feature plan, selection sets, profiles, context management, phase 1

## 1. Overview & Goal

The goal of the "Selection Sets" feature is to address the user feedback from Cycle 11 regarding the need to save and switch between different file selections. Users often work on multiple tasks or projects concurrently, each requiring a different context. Manually re-selecting dozens of files each time they switch tasks is tedious and inefficient. This feature will allow users to save a named "set" of their current selections and quickly load it back later.

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| US-01 | **Save Current Selection** | As a developer, I want to save my currently checked files as a named set, so I don't have to re-select them manually when I switch tasks. | - A UI element (e.g., button or menu item) exists to "Save current selection". <br> - Clicking it prompts me to enter a name for the selection set. <br> - After providing a name, the current list of selected file paths is saved. <br> - I receive a confirmation that the set was saved. |
| US-02 | **Load a Saved Selection** | As a developer, I want to load a previously saved selection set, so I can quickly restore a specific context. | - A UI element (e.g., a dropdown menu) lists all saved selection sets by name. <br> - Selecting a set from the list immediately updates the file tree, checking all the files and folders from that set. <br> - Any previously checked files that are not part of the loaded set become unchecked. |
| US-03 | **Delete a Saved Selection** | As a developer, I want to delete a selection set that I no longer need, so I can keep my list of saved sets clean. | - A UI element exists to manage or delete saved sets. <br> - I can select a set to delete from a list. <br> - I am asked to confirm the deletion. <br> - Upon confirmation, the set is removed from the list of saved sets. |

## 3. Proposed UI/UX

The most efficient place for this functionality is within the `view-header` of our Context Chooser panel.

1.  **Header Controls:**
    *   A dropdown menu will be added to the header, perhaps next to the "Flatten Context" button.
    *   The dropdown's default text will be "Selection Sets".
    *   The dropdown will contain:
        *   A list of currently saved selection sets.
        *   A separator.
        *   An action item: "Save Current Selection..."
        *   An action item: "Manage Selections..."

2.  **Saving a Set:**
    *   Clicking "Save Current Selection..." will trigger a VS Code input box (`vscode.window.showInputBox`).
    *   The user will enter a name (e.g., "API Feature", "Frontend Refactor").
    *   On submission, the backend saves the current `selectedFiles` array under that name.

3.  **Loading a Set:**
    *   Clicking on a saved set's name in the dropdown will immediately trigger an IPC message to the frontend with the array of file paths for that set.
    *   The frontend will update its `selectedFiles` state, causing the tree to re-render with the new selections.

4.  **Managing Sets:**
    *   Clicking "Manage Selections..." will open a Quick Pick list (`vscode.window.showQuickPick`).
    *   The list will show all saved sets. Each item will have a trash can icon next to it.
    *   Selecting an item will prompt for confirmation and then delete the set.

## 4. Technical Implementation Plan

1.  **Data Storage:**
    *   Selection sets will be stored in the VS Code `workspaceState`. This is a key-value store specific to the current workspace.
    *   A single key, e.g., `dce.selectionSets`, will hold an object where keys are the set names and values are the `string[]` of absolute file paths.
    *   Example: `{ "API Feature": ["/path/to/api.ts", "/path/to/service.ts"], "UI Bugfix": ["/path/to/component.tsx"] }`

2.  **IPC Channels (New/Updated):**
    *   **Client -> Server:**
        *   `RequestSelectionSets`: Sent on view load to populate the dropdown.
        *   `SaveSelectionSet`: Sent with `{ name: string, paths: string[] }`.
        *   `DeleteSelectionSet`: Sent with `{ name: string }`.
    *   **Server -> Client:**
        *   `SendSelectionSets`: Sent with the entire map of saved sets.
        *   `LoadSelectionSet`: Sent with a single `{ paths: string[] }` to update the view's state.

3.  **Backend Logic (`on-message.ts` & new Service):**
    *   Create a new `SelectionService.ts` to encapsulate all logic for getting, setting, and deleting sets from `workspaceState`.
    *   Update `on-message.ts` to handle the new IPC messages and call the appropriate methods in `SelectionService`.
    *   The `LoadSelectionSet` message will be sent from the backend to the client after a user selects a set to load from the UI (which would be handled by a command). A command would be better for showing the Quick Pick UI.

4.  **Frontend Logic (`view.tsx`):**
    *   Add state to store the map of selection sets: `const [selectionSets, setSelectionSets] = useState({});`
    *   On mount, send `RequestSelectionSets`.
    *   Implement an effect to listen for `SendSelectionSets` and update the local state.
    *   Implement an effect to listen for `LoadSelectionSet` and call `setSelectedFiles()` with the new paths.
    *   Render the new dropdown menu in the header.
    *   Implement the `onClick` handler for "Save Current Selection..." which will trigger the `SaveSelectionSet` message.
</file>

<file path="src/Artifacts/A9. DCE - GitHub Repository Setup Guide.md">
# Artifact A9: DCE - GitHub Repository Setup Guide
# Date Created: Cycle 12
# Author: AI Model

- **Description:** A step-by-step guide with the necessary git commands to initialize the project as a local repository and push it to a new remote repository on GitHub.
- **Tags:** git, github, version control, setup, repository

## 1. Overview

This guide provides the necessary commands to turn your local project folder into a Git repository and link it to a new, empty repository on GitHub.

## 2. Prerequisites

*   You have `git` installed on your machine.
*   You have a GitHub account.
*   Your GitHub username is `dgerabagi`.

## 3. Step-by-Step Instructions

### Step 1: Create a New Repository on GitHub

1.  Go to [github.com](https://github.com) and log in.
2.  In the top-right corner, click the `+` icon and select **"New repository"**.
3.  **Repository name:** A good name would be `data-curation-environment` or `vscode-dce-extension`.
4.  **Description:** (Optional) "A VS Code extension for curating context for Large Language Models."
5.  Choose **"Private"** or **"Public"** based on your preference.
6.  **IMPORTANT:** Do **not** initialize the repository with a `README`, `.gitignore`, or `license`. We will be pushing our existing files, and this will prevent conflicts.
7.  Click **"Create repository"**.

GitHub will now show you a page with several command-line instructions. We will use the section titled **"...or push an existing repository from the command line"**.

### Step 2: Initialize Git in Your Local Project

Open a terminal (like the one integrated into VS Code) and navigate to your project's root directory (e.g., `C:\Projects\DCE`). Then, run the following commands one by one.

1.  **Initialize the repository:** This creates a new `.git` subdirectory in your project folder.
    ```bash
    git init
    ```

2.  **Add all existing files to the staging area:** The `.` adds all files in the current directory and subdirectories.
    ```bash
    git add .
    ```

3.  **Create the first commit:** This saves the staged files to the repository's history.
    ```bash
    git commit -m "Initial commit"
    ```

4.  **Rename the default branch to `main`:** This is the modern standard, replacing the older `master`.
    ```bash
    git branch -M main
    ```

### Step 3: Link and Push to GitHub

Now, you will link your local repository to the empty one you created on GitHub.

1.  **Add the remote repository:** Replace the URL with the one from your GitHub repository page. It should look like the example below.
    ```bash
    git remote add origin https://github.com/dgerabagi/data-curation-environment.git
    ```

2.  **Push your local `main` branch to GitHub:** The `-u` flag sets the upstream remote so that in the future, you can simply run `git push`.
    ```bash
    git push -u origin main
    ```

After these commands complete, refresh your GitHub repository page. You should see all of your project files. You have successfully created and linked your repository!
```
</file>

<file path="src/backend/commands/commands.ts">
import * as vscode from 'vscode';
import { Services } from '../services/services';
import { serverIPCs } from '@/client/views';
import { ServerToClientChannel } from '@/common/ipc/channels.enum';
import { VIEW_TYPES } from '@/common/view-types';

export const commands = [
    {
        commandId: 'dce.saveSelectionSet',
        callback: async (selectedPaths: string[]) => {
            const name = await vscode.window.showInputBox({
                prompt: 'Enter a name for the selection set',
                placeHolder: 'e.g., "API Feature" or "Frontend Refactor"'
            });
            if (name) {
                await Services.selectionService.saveSelectionSet(name, selectedPaths);
                // Refresh the list in the webview
                const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CONTEXT_CHOOSER];
                if(serverIpc) {
                    serverIpc.sendToClient(ServerToClientChannel.SendSelectionSets, { sets: Services.selectionService.getSelectionSets() });
                }
            }
        }
    },
    {
        commandId: 'dce.loadSelectionSet',
        callback: async () => {
            const sets = Services.selectionService.getSelectionSets();
            const setNames = Object.keys(sets);
             if (setNames.length === 0) {
                vscode.window.showInformationMessage("No saved selection sets.");
                return;
            }
            const name = await vscode.window.showQuickPick(setNames, {
                placeHolder: 'Select a selection set to load'
            });

            if (name) {
                const paths = sets[name];
                if (paths) {
                    const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CONTEXT_CHOOSER];
                    if(serverIpc) {
                        serverIpc.sendToClient(ServerToClientChannel.ApplySelectionSet, { paths });
                        vscode.window.showInformationMessage(`Loaded selection set '${name}'.`);
                    }
                }
            }
        }
    },
    {
        commandId: 'dce.deleteSelectionSet',
        callback: async () => {
            const sets = Services.selectionService.getSelectionSets();
            const setNames = Object.keys(sets);
            if (setNames.length === 0) {
                vscode.window.showInformationMessage("No selection sets to delete.");
                return;
            }
            const setToDelete = await vscode.window.showQuickPick(setNames, {
                placeHolder: 'Select a selection set to delete'
            });

            if (setToDelete) {
                await Services.selectionService.deleteSelectionSet(setToDelete);
                 // Refresh the list in the webview
                 const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CONTEXT_CHOOSER];
                 if(serverIpc) {
                     serverIpc.sendToClient(ServerToClientChannel.SendSelectionSets, { sets: Services.selectionService.getSelectionSets() });
                 }
            }
        }
    },
    {
        commandId: 'dce.refreshTree',
        callback: () => {
            const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CONTEXT_CHOOSER];
            if (serverIpc) {
                Services.loggerService.log("Executing dce.refreshTree command.");
                Services.fsService.handleWorkspaceFilesRequest(serverIpc);
            } else {
                Services.loggerService.warn("Could not refresh tree: serverIpc not found.");
            }
        }
    }
];
</file>

<file path="src/backend/commands/register-commands.ts">
import * as vscode from "vscode";
import { commands } from "./commands";
import { Services } from "../services/services";

export function registerCommands(context: vscode.ExtensionContext) {
    Services.loggerService.log(`Registering ${commands.length} commands.`);
    commands.forEach(({ commandId, callback }) => {
        let disposable = vscode.commands.registerCommand(commandId, callback);
        context.subscriptions.push(disposable);
    });
}
</file>

<file path="src/backend/services/flattener.service.ts">
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs/promises';
import { ServerPostMessageManager } from '@/common/ipc/server-ipc';
import { Services } from './services';
import { VIEW_TYPES } from '@/common/view-types';
import { serverIPCs } from '@/client/views';

interface FileStats {
    filePath: string;
    lines: number;
    characters: number;
    tokens: number;
    content: string;
    error: string | null;
}

export class FlattenerService {

    public async flatten(selectedPaths: string[]) {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            vscode.window.showErrorMessage("Cannot flatten context: No workspace folder is open.");
            return;
        }
        if (selectedPaths.length === 0) {
            vscode.window.showWarningMessage("Cannot flatten context: No files or folders are selected.");
            return;
        }

        const rootPath = workspaceFolders[0].uri.fsPath;
        const outputFilePath = path.join(rootPath, 'flattened_repo.md');

        try {
            const allFilePaths = await this.expandDirectories(selectedPaths);
            const uniqueFilePaths = [...new Set(allFilePaths)];

            const fileStatsPromises = uniqueFilePaths.map(filePath => this.getFileStatsAndContent(filePath));
            const results = await Promise.all(fileStatsPromises);

            const outputContent = this.generateOutputContent(results, rootPath, outputFilePath);

            await fs.writeFile(outputFilePath, outputContent, 'utf-8');
            vscode.window.showInformationMessage(`Successfully flattened ${results.filter(r => !r.error).length} files to flattened_repo.md.`);

            // After successful flattening, trigger a refresh of the file tree.
            const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CONTEXT_CHOOSER];
            if (serverIpc) {
                Services.loggerService.log("Triggering file tree refresh after flattening.");
                // The file watcher will pick up the change automatically.
                // No need for a forced refresh call, as it's now debounced.
            }

        } catch (error: any) {
            vscode.window.showErrorMessage(`Failed to flatten context: ${error.message}`);
            console.error(error);
        }
    }

    private async expandDirectories(paths: string[]): Promise<string[]> {
        const allFiles: string[] = [];
        for (const p of paths) {
            try {
                const stats = await fs.stat(p);
                if (stats.isDirectory()) {
                    allFiles.push(...await this.getAllFilesRecursive(p));
                } else {
                    allFiles.push(p);
                }
            } catch (e) {
                console.warn(`Could not stat path ${p}, skipping.`);
            }
        }
        return allFiles;
    }

    private async getAllFilesRecursive(dirPath: string): Promise<string[]> {
        let files: string[] = [];
        try {
            const entries = await fs.readdir(dirPath, { withFileTypes: true });
            for (const entry of entries) {
                const fullPath = path.join(dirPath, entry.name);
                if (entry.isDirectory()) {
                    // Skip node_modules at any level
                    if (entry.name.toLowerCase() === 'node_modules') continue;
                    files = files.concat(await this.getAllFilesRecursive(fullPath));
                } else {
                    files.push(fullPath);
                }
            }
        } catch (e) {
            console.error(`Error reading directory ${dirPath}:`, e);
        }
        return files;
    }

    private async getFileStatsAndContent(filePath: string): Promise<FileStats> {
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            const lines = content.split('\n').length;
            const characters = content.length;
            const tokens = Math.ceil(characters / 4);
            return { filePath, lines, characters, tokens, content, error: null };
        } catch (error: any) {
            return { filePath, lines: 0, characters: 0, tokens: 0, content: '', error: error.message };
        }
    }

    private generateOutputContent(results: FileStats[], rootDir: string, outputFilename: string): string {
        let totalLines = 0;
        let totalCharacters = 0;
        let totalTokens = 0;
        let errorCount = 0;
        const validResults = results.filter(r => !r.error);

        for (const res of validResults) {
            totalLines += res.lines;
            totalCharacters += res.characters;
            totalTokens += res.tokens;
        }

        let output = `<!--\n`;
        output += `  File: ${path.basename(outputFilename)}\n`;
        output += `  Source Directory: ${rootDir}\n`;
        output += `  Date Generated: ${new Date().toISOString()}\n`;
        output += `  ---\n`;
        output += `  Total Files: ${validResults.length}\n`;
        if (errorCount > 0) {
            output += `  Files with Errors: ${errorCount}\n`;
        }
        output += `  Total Lines: ${totalLines}\n`;
        output += `  Total Characters: ${totalCharacters}\n`;
        output += `  Approx. Tokens: ${totalTokens}\n`;
        output += `-->\n\n`;

        const top10 = [...validResults].sort((a, b) => b.tokens - a.tokens).slice(0, 10);

        output += `<!-- Top 10 Files by Token Count -->\n`;
        top10.forEach((r, i) => {
            output += `${i + 1}. ${path.relative(rootDir, r.filePath)} (${r.tokens} tokens)\n`;
        });
        output += `\n`;

        output += `<!-- Full File List -->\n`;
        results.forEach((r, i) => {
            const relativePath = path.relative(rootDir, r.filePath);
            if (r.error) {
                output += `${i + 1}. ${relativePath} - ERROR: ${r.error}\n`;
            } else {
                output += `${i + 1}. ${relativePath} - Lines: ${r.lines} - Chars: ${r.characters} - Tokens: ${r.tokens}\n`;
            }
        });
        output += `\n`;

        for (const { filePath, content, error } of results) {
            const relativePath = path.relative(rootDir, filePath).replace(/\\/g, '/');
            output += `<file path="${relativePath}">\n`;
            if (error) {
                output += `Error reading file: ${error}\n`;
            } else {
                output += content;
            }
            if (!content.endsWith('\n')) {
                output += '\n';
            }
            output += `</file>\n\n`;
        }
        return output;
    }
}
</file>

<file path="src/backend/services/fs.service.ts">
import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs/promises";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { ServerToClientChannel } from "@/common/ipc/channels.enum";
import { FileNode } from "@/common/types/file-node";
import { Services } from "./services";
import { serverIPCs } from "@/client/views";
import { VIEW_TYPES } from "@/common/view-types";

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg', '.webp', '.ico']);

export class FSService {
    private fileTreeCache: FileNode[] | null = null;
    private watcher: vscode.FileSystemWatcher | null = null;
    private debounceTimer: NodeJS.Timeout | null = null;

    public initializeWatcher() {
        if (this.watcher) {
            this.watcher.dispose();
        }
        
        this.watcher = vscode.workspace.createFileSystemWatcher('**/*');
        Services.loggerService.log("File system watcher initialized.");

        const changeHandler = (uri: vscode.Uri) => {
            if (this.debounceTimer) {
                clearTimeout(this.debounceTimer);
            }
            this.debounceTimer = setTimeout(() => {
                Services.loggerService.log(`File system change detected at ${uri.fsPath}. Invalidating cache and triggering refresh.`);
                this.fileTreeCache = null;
                
                const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CONTEXT_CHOOSER];
                if (serverIpc) {
                    this.handleWorkspaceFilesRequest(serverIpc, true);
                } else {
                    Services.loggerService.warn("Could not push file tree update, serverIpc not available.");
                }
            }, 500);
        };

        this.watcher.onDidChange(changeHandler);
        this.watcher.onDidCreate(changeHandler);
        this.watcher.onDidDelete(changeHandler);
    }

    private async getFileStats(filePath: string): Promise<{ tokenCount: number, sizeInBytes: number, isImage: boolean }> {
        try {
            const extension = path.extname(filePath).toLowerCase();
            const stats = await fs.stat(filePath);

            if (stats.isDirectory()) {
                return { tokenCount: 0, sizeInBytes: 0, isImage: false };
            }

            const isImage = IMAGE_EXTENSIONS.has(extension);
            if (isImage) {
                return { tokenCount: 0, sizeInBytes: stats.size, isImage: true };
            }

            if (stats.size > 5_000_000) {
                Services.loggerService.warn(`Skipping token count for large file: ${filePath} (${stats.size} bytes)`);
                return { tokenCount: 0, sizeInBytes: stats.size, isImage: false };
            }
            
            const content = await fs.readFile(filePath, 'utf-8');
            const tokenCount = Math.ceil(content.length / 4);
            return { tokenCount, sizeInBytes: stats.size, isImage: false };

        } catch (error: any) {
            Services.loggerService.warn(`Could not get stats for ${filePath}: ${error.message}`);
            return { tokenCount: 0, sizeInBytes: 0, isImage: false };
        }
    }

    public async handleWorkspaceFilesRequest(serverIpc: ServerPostMessageManager, forceRefresh: boolean = false) {
        if (!forceRefresh && this.fileTreeCache) {
            Services.loggerService.log("Serving file tree from cache.");
            serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: this.fileTreeCache });
            return;
        }

        Services.loggerService.log("Building file tree from scratch.");
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            Services.loggerService.warn("No workspace folder open. Sending empty file list.");
            serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: [] });
            return;
        }
        
        const rootUri = workspaceFolders[0].uri;
        const rootPath = rootUri.fsPath;
        
        const excludePattern = '{**/node_modules/**,**/dist/**,**/out/**,**/.git/**,**/flattened_repo.md}';
        Services.loggerService.log(`Scanning for files with exclusion pattern: ${excludePattern}`);
        
        const files = await vscode.workspace.findFiles("**/*", excludePattern);
        Services.loggerService.log(`Found ${files.length} files after exclusion.`);
        
        const fileTree = await this.createFileTree(rootPath, files);

        this.fileTreeCache = [fileTree];
        Services.loggerService.log("Sending file tree to client and caching result.");
        serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: this.fileTreeCache });
    }

    private async createFileTree(rootPath: string, files: vscode.Uri[]): Promise<FileNode> {
        const rootStats = await this.getFileStats(rootPath);
        const rootNode: FileNode = {
            name: path.basename(rootPath),
            absolutePath: rootPath,
            children: [],
            ...rootStats,
            fileCount: 0,
        };

        const allNodes = new Map<string, FileNode>();
        allNodes.set(rootPath, rootNode);

        for (const file of files) {
            const relativePath = path.relative(rootPath, file.fsPath);
            const parts = relativePath.split(path.sep);
            let currentPath = rootPath;
            let parentNode = rootNode;

            for (const part of parts) {
                currentPath = path.join(currentPath, part);
                let childNode = allNodes.get(currentPath);

                if (!childNode) {
                    const stats = await this.getFileStats(currentPath);
                    const isDirectory = stats.sizeInBytes === 0 && !stats.isImage && (await fs.stat(currentPath)).isDirectory();
                    childNode = {
                        name: part,
                        absolutePath: currentPath,
                        ...stats,
                        fileCount: isDirectory ? 0 : 1
                    };
                    if (isDirectory) {
                        childNode.children = [];
                    }

                    if (parentNode.children) {
                        parentNode.children.push(childNode);
                        allNodes.set(currentPath, childNode);
                    }
                }
                parentNode = childNode;
            }
        }
        
        this.processNode(rootNode);
        return rootNode;
    }

    private processNode(node: FileNode): void {
        if (!node.children) {
            node.fileCount = 1;
            return;
        }

        for (const child of node.children) {
            this.processNode(child);
        }

        node.children.sort((a, b) => {
            const aIsFolder = !!a.children;
            const bIsFolder = !!b.children;
            if (aIsFolder !== bIsFolder) {
                return aIsFolder ? -1 : 1;
            }
            return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
        });
        
        let totalTokens = 0;
        let totalFiles = 0;
        let totalBytes = 0;
        for (const child of node.children) {
            totalTokens += child.tokenCount;
            totalFiles += child.fileCount;
            totalBytes += child.sizeInBytes;
        }
        node.tokenCount = totalTokens;
        node.fileCount = totalFiles;
        node.sizeInBytes = totalBytes;
    }

    // --- File Operations ---

    public async handleNewFileRequest(parentDirectory: string) {
        const newFileName = await vscode.window.showInputBox({
            prompt: "Enter the name of the new file",
            value: "new-file.ts",
        });
        if (newFileName) {
            const newFilePath = path.join(parentDirectory, newFileName);
            try {
                await vscode.workspace.fs.writeFile(vscode.Uri.file(newFilePath), new Uint8Array());
            } catch (error: any) {
                vscode.window.showErrorMessage(`Failed to create file: ${error.message}`);
            }
        }
    }

    public async handleNewFolderRequest(parentDirectory: string) {
        const newFolderName = await vscode.window.showInputBox({
            prompt: "Enter the name of the new folder",
            value: "new-folder",
        });
        if (newFolderName) {
            const newFolderPath = path.join(parentDirectory, newFolderName);
            try {
                await vscode.workspace.fs.createDirectory(vscode.Uri.file(newFolderPath));
            } catch (error: any) {
                vscode.window.showErrorMessage(`Failed to create folder: ${error.message}`);
            }
        }
    }

    public async handleFileRenameRequest(oldPath: string, newName: string) {
        const newPath = path.join(path.dirname(oldPath), newName);
        try {
            await vscode.workspace.fs.rename(vscode.Uri.file(oldPath), vscode.Uri.file(newPath));
        } catch (error: any) {
            vscode.window.showErrorMessage(`Failed to rename: ${error.message}`);
        }
    }

    public async handleFileDeleteRequest(filePath: string) {
        const confirmation = await vscode.window.showWarningMessage(
            `Are you sure you want to delete ${path.basename(filePath)}? This will move it to the trash.`,
            { modal: true },
            'Delete'
        );
        if (confirmation === 'Delete') {
            try {
                await vscode.workspace.fs.delete(vscode.Uri.file(filePath), { recursive: true, useTrash: true });
            } catch (error: any) {
                vscode.window.showErrorMessage(`Failed to delete: ${error.message}`);
            }
        }
    }

    public handleRevealInExplorerRequest(filePath: string) {
        vscode.commands.executeCommand('revealInExplorer', vscode.Uri.file(filePath));
    }

    public handleCopyPathRequest(filePath: string, relative: boolean) {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        let pathToCopy = filePath;
        if (relative && workspaceFolders && workspaceFolders.length > 0) {
            pathToCopy = path.relative(workspaceFolders[0].uri.fsPath, filePath);
        }
        vscode.env.clipboard.writeText(pathToCopy);
        vscode.window.showInformationMessage(`Copied to clipboard: ${pathToCopy}`);
    }
}
</file>

<file path="src/backend/services/logger.service.ts">
import * as vscode from 'vscode';

export class LoggerService {
    private static instance: LoggerService;
    private outputChannel: vscode.OutputChannel;

    private constructor() {
        this.outputChannel = vscode.window.createOutputChannel("Data Curation Environment");
    }

    public static getInstance(): LoggerService {
        if (!LoggerService.instance) {
            LoggerService.instance = new LoggerService();
        }
        return LoggerService.instance;
    }

    public show() {
        this.outputChannel.show(true); // true => preserve focus
    }

    private logMessage(level: 'INFO' | 'WARN' | 'ERROR', message: string): void {
        const timestamp = new Date().toLocaleTimeString();
        this.outputChannel.appendLine(`[${level}] [${timestamp}] ${message}`);
    }

    public log(message: string): void {
        this.logMessage('INFO', message);
    }

    public warn(message: string): void {
        this.logMessage('WARN', message);
    }

    public error(message: string): void {
        this.logMessage('ERROR', message);
    }
}
</file>

<file path="src/backend/services/selection.service.ts">
import * as vscode from 'vscode';
import { getContext } from '@/extension';

const SELECTION_SETS_KEY = 'dce.selectionSets';

export interface SelectionSet {
    [name: string]: string[];
}

export class SelectionService {
    
    private get context(): vscode.ExtensionContext {
        return getContext();
    }

    public getSelectionSets(): SelectionSet {
        return this.context.workspaceState.get<SelectionSet>(SELECTION_SETS_KEY, {});
    }

    public async saveSelectionSet(name: string, paths: string[]): Promise<void> {
        if (!name) {
            vscode.window.showErrorMessage("Selection set name cannot be empty.");
            return;
        }
        const sets = this.getSelectionSets();
        sets[name] = paths;
        await this.context.workspaceState.update(SELECTION_SETS_KEY, sets);
        vscode.window.showInformationMessage(`Selection set '${name}' saved.`);
    }

    public async deleteSelectionSet(name: string): Promise<void> {
        const sets = this.getSelectionSets();
        if (sets[name]) {
            delete sets[name];
            await this.context.workspaceState.update(SELECTION_SETS_KEY, sets);
            vscode.window.showInformationMessage(`Selection set '${name}' deleted.`);
        }
    }
}
</file>

<file path="src/backend/services/services.ts">
import "reflect-metadata";
import { FSService } from "./fs.service";
import { FlattenerService } from "./flattener.service";
import { SelectionService } from "./selection.service";
import { LoggerService } from "./logger.service";

// A simple container for services
class ServiceContainer {
    public fsService = new FSService();
    public flattenerService = new FlattenerService();
    public selectionService = new SelectionService();
    public loggerService = LoggerService.getInstance();
    
    public initialize() {
        this.loggerService.log("Services initializing...");
        // C20: Correctly call the watcher initialization method.
        this.fsService.initializeWatcher();
        this.loggerService.log("Services initialized successfully.");
    }
}

export const Services = new ServiceContainer();
</file>

<file path="src/client/components/Checkbox.tsx">
import React from "react";
import { useEffect, useRef } from "react";

interface CheckboxProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange'> {
    checked: boolean;
    indeterminate?: boolean;
    onChange: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = (props: CheckboxProps) => {
    const { checked, onChange, indeterminate, ...rest } = props;
    const cRef = useRef<any>(null);

    useEffect(() => {
        if (cRef.current) {
            cRef.current.indeterminate = indeterminate;
        }
    }, [cRef, indeterminate]);

    return (
        <input type="checkbox" ref={cRef} checked={checked} onChange={(e) => onChange(e.target.checked, e)} {...rest} />
    );
};

export default Checkbox;
</file>

<file path="src/client/components/ContextMenu.tsx">
import React, { useEffect, useRef } from 'react';
import { FileNode } from '@/common/types/file-node';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel } from '@/common/ipc/channels.enum';

interface ContextMenuProps {
    menu: { x: number; y: number; node: FileNode };
    onClose: () => void;
    onRename: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ menu, onClose, onRename }) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const clientIpc = ClientPostMessageManager.getInstance();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const handleAction = (action: () => void) => {
        action();
        onClose();
    };
    
    const { node } = menu;
    const isDirectory = !!node.children;

    return (
        <>
            <div className="context-menu-overlay" onClick={onClose}></div>
            <div ref={menuRef} className="context-menu" style={{ top: menu.y, left: menu.x }}>
                <ul>
                    {isDirectory && (
                        <>
                            <li onClick={() => handleAction(() => clientIpc.sendToServer(ClientToServerChannel.RequestNewFile, { parentDirectory: node.absolutePath }))}>New File...</li>
                            <li onClick={() => handleAction(() => clientIpc.sendToServer(ClientToServerChannel.RequestNewFolder, { parentDirectory: node.absolutePath }))}>New Folder...</li>
                            <hr />
                        </>
                    )}
                    <li onClick={() => handleAction(() => onRename())}>Rename</li>
                    <li onClick={() => handleAction(() => clientIpc.sendToServer(ClientToServerChannel.RequestFileDelete, { path: node.absolutePath }))}>Delete</li>
                    <hr />
                    <li onClick={() => handleAction(() => clientIpc.sendToServer(ClientToServerChannel.RequestCopyPath, { path: node.absolutePath, relative: false }))}>Copy Path</li>
                    <li onClick={() => handleAction(() => clientIpc.sendToServer(ClientToServerChannel.RequestCopyPath, { path: node.absolutePath, relative: true }))}>Copy Relative Path</li>
                    <hr />
                    <li onClick={() => handleAction(() => clientIpc.sendToServer(ClientToServerChannel.RequestRevealInExplorer, { path: node.absolutePath }))}>Reveal in File Explorer</li>
                </ul>
            </div>
        </>
    );
};

export default ContextMenu;
</file>

<file path="src/client/components/file-tree/FileTree.tsx">
import React, { useState } from 'react';
import TreeView from '../tree-view/TreeView';
import { FileNode } from '@/common/types/file-node';
import { addRemovePathInSelectedFiles } from './FileTree.utils';
import Checkbox from '../Checkbox';
import {
    VscFile, VscFolder, VscFolderOpened, VscJson, VscMarkdown, VscSymbolFile, VscSymbolNumeric, VscFiles
} from 'react-icons/vsc';
import { SiTypescript, SiReact, SiJavascript, SiSass } from 'react-icons/si';
import { formatLargeNumber, formatBytes, formatNumberWithCommas } from '@/common/utils/formatting';
import ContextMenu from '../ContextMenu';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel } from '@/common/ipc/channels.enum';

interface FileTreeProps {
  data: FileNode[];
  onFileClick?: (filePath: string) => void;
  selectedFiles: string[];
  activeFile?: string;
  updateSelectedFiles: (selectedFiles: string[]) => void;
}

const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
        case 'ts': return <SiTypescript color="#3178C6" />;
        case 'tsx': return <SiReact color="#61DAFB" />;
        case 'js': return <SiJavascript color="#F7DF1E" />;
        case 'json': return <VscJson color="#F7DF1E" />;
        case 'md': return <VscMarkdown />;
        case 'scss': case 'css': return <SiSass color="#CF649A"/>;
        case 'svg': case 'png': case 'jpg': case 'jpeg': case 'ico': case 'webp': return <VscSymbolFile />;
        default: return <VscFile />;
    }
};

const FileTree: React.FC<FileTreeProps> = ({ data, onFileClick, selectedFiles, activeFile, updateSelectedFiles }) => {
    const [contextMenu, setContextMenu] = useState<{ x: number, y: number, node: FileNode } | null>(null);
    const [renamingPath, setRenamingPath] = useState<string | null>(null);
    const [renameValue, setRenameValue] = useState('');
    const clientIpc = ClientPostMessageManager.getInstance();

    const handleNodeClick = (node: FileNode) => {
        if (!node.children) {
            onFileClick?.(node.absolutePath);
        }
    };

    const handleFileCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, filePath: string) => {
        e.stopPropagation();
        updateSelectedFiles(addRemovePathInSelectedFiles(data, filePath, selectedFiles));
    };

    const handleContextMenu = (event: React.MouseEvent, node: FileNode) => {
        event.preventDefault();
        event.stopPropagation();
        setContextMenu({ x: event.clientX, y: event.clientY, node });
    };

    const handleRename = () => {
        if (contextMenu) {
            setRenamingPath(contextMenu.node.absolutePath);
            setRenameValue(contextMenu.node.name);
            setContextMenu(null);
        }
    };

    const handleRenameSubmit = () => {
        if (renamingPath && renameValue) {
            clientIpc.sendToServer(ClientToServerChannel.RequestFileRename, { oldPath: renamingPath, newName: renameValue });
        }
        setRenamingPath(null);
    };

    const renderFileNodeContent = (node: FileNode, isExpanded: boolean) => {
        const isActive = activeFile === node.absolutePath;
        const isDirectory = Array.isArray(node.children);

        if (renamingPath === node.absolutePath) {
            return (
                <input
                    type="text"
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    onBlur={handleRenameSubmit}
                    onKeyDown={(e) => e.key === 'Enter' && handleRenameSubmit()}
                    autoFocus
                    className="rename-input"
                />
            );
        }

        return (
            <div className={`file-item ${isActive ? 'active' : ''}`} onClick={() => handleNodeClick(node)}>
                <Checkbox
                    className="file-checkbox"
                    checked={selectedFiles.includes(node.absolutePath) || selectedFiles.some(p => node.absolutePath.startsWith(p + '/'))}
                    indeterminate={!selectedFiles.includes(node.absolutePath) && selectedFiles.some(p => p.startsWith(node.absolutePath))}
                    onChange={(_, e) => handleFileCheckboxChange(e, node.absolutePath)}
                />
                <span className="file-icon">{isDirectory ? (isExpanded ? <VscFolderOpened /> : <VscFolder />) : getFileIcon(node.name)}</span>
                <span className="file-name">{node.name}</span>
                <div className="file-stats">
                    {isDirectory && node.fileCount > 0 && (<> <VscFiles /> <span>{formatNumberWithCommas(node.fileCount)}</span> </>)}
                    {node.isImage ? (<span>{formatBytes(node.sizeInBytes)}</span>) : (node.tokenCount > 0 && (<> <VscSymbolNumeric /> <span>{formatLargeNumber(node.tokenCount, 1)}</span> </>))}
                </div>
            </div>
        );
    };

    return (
        <div className="file-tree">
            <TreeView data={data} renderNodeContent={(node, isExpanded) => renderFileNodeContent(node, isExpanded as boolean)} onContextMenu={handleContextMenu} />
            {contextMenu && <ContextMenu menu={contextMenu} onClose={() => setContextMenu(null)} onRename={handleRename} />}
        </div>
    );
};

export default FileTree;
</file>

<file path="src/client/components/file-tree/FileTree.utils.ts">
import { FileNode } from "@/common/types/file-node";

function getAllDescendantPaths(node: FileNode): string[] {
    let paths: string[] = [];
    if (node.children) {
        for (const child of node.children) {
            paths.push(child.absolutePath);
            paths = paths.concat(getAllDescendantPaths(child));
        }
    }
    return paths;
}

function findNode(node: FileNode, filePath: string): FileNode | null {
    if (node.absolutePath === filePath) {
        return node;
    }
    // Normalize paths for comparison to avoid issues with mixed slashes
    const normalizedFilePath = filePath.replace(/\\/g, '/');
    const normalizedNodePath = node.absolutePath.replace(/\\/g, '/');

    if (node.children && normalizedFilePath.startsWith(normalizedNodePath + '/')) {
        for (const child of node.children) {
            const found = findNode(child, filePath);
            if(found) return found;
        }
    }
    return null;
}

export const getFileNodeByPath = (
  fileNodes: FileNode[],
  filePath: string
): FileNode | null => {
    for (const rootNode of fileNodes) {
        const found = findNode(rootNode, filePath);
        if (found) return found;
    }
    return null;
};

export const addRemovePathInSelectedFiles = (
  fileTree: FileNode[],
  path: string,
  selectedFiles: string[]
): string[] => {
    const node = getFileNodeByPath(fileTree, path);
    if (!node) return selectedFiles;

    let newSelectedFiles = [...selectedFiles];

    const isDirectlySelected = newSelectedFiles.includes(path);
    const selectedAncestor = newSelectedFiles.find(ancestor => {
        const normalizedPath = path.replace(/\\/g, '/');
        const normalizedAncestor = ancestor.replace(/\\/g, '/');
        return normalizedPath.startsWith(normalizedAncestor + '/') && path !== ancestor;
    });

    const isEffectivelySelected = isDirectlySelected || !!selectedAncestor;

    if (isEffectivelySelected) {
        if (selectedAncestor) {
            newSelectedFiles = newSelectedFiles.filter(p => p !== selectedAncestor);
            const ancestorNode = getFileNodeByPath(fileTree, selectedAncestor);
            if (ancestorNode && ancestorNode.children) {
                for (const child of ancestorNode.children) {
                    if (child.absolutePath !== path) {
                         newSelectedFiles.push(child.absolutePath);
                    }
                }
            }
        } else {
            const descendantPaths = getAllDescendantPaths(node);
            newSelectedFiles = newSelectedFiles.filter(p => p !== path && !descendantPaths.includes(p));
        }
    } else {
        const descendantPaths = getAllDescendantPaths(node);
        newSelectedFiles = newSelectedFiles.filter(p => !descendantPaths.includes(p));
        newSelectedFiles.push(path);
    }
  
  return [...new Set(newSelectedFiles)];
};

export const removePathsFromSelected = (
    pathsToRemove: string[],
    selectedFiles: string[],
    fileTree: FileNode[]
): string[] => {
    let newSelectedFiles = [...selectedFiles];
    for (const path of pathsToRemove) {
        // This reuses the same logic as unchecking, which is complex.
        // A simpler approach is to just remove the path and its descendants.
        const node = getFileNodeByPath(fileTree, path);
        if (!node) continue;

        const descendantPaths = getAllDescendantPaths(node);
        newSelectedFiles = newSelectedFiles.filter(p => p !== path && !descendantPaths.includes(p));
    }
    return newSelectedFiles;
};
</file>

<file path="src/client/components/SelectedFilesView.tsx">
import * as React from 'react';
import { useState, useMemo } from 'react';
import { FileNode } from '@/common/types/file-node';
import { VscClose, VscChevronUp, VscChevronDown, VscSymbolFile, VscSymbolNumeric } from 'react-icons/vsc';
import { formatLargeNumber } from '@/common/utils/formatting';
import Checkbox from './Checkbox';
import { SiReact, SiSass, SiTypescript, SiJavascript } from 'react-icons/si';
import { VscFile, VscJson, VscMarkdown } from 'react-icons/vsc';

type SortableColumn = 'name' | 'tokenCount';
type SortDirection = 'asc' | 'desc';

const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
        case 'ts': return <SiTypescript color="#3178C6" />;
        case 'tsx': return <SiReact color="#61DAFB" />;
        case 'js': return <SiJavascript color="#F7DF1E" />;
        case 'json': return <VscJson color="#F7DF1E" />;
        case 'md': return <VscMarkdown />;
        case 'scss': case 'css': return <SiSass color="#CF649A"/>;
        default: return <VscFile />;
    }
};

interface SelectedFilesViewProps {
    selectedFileNodes: FileNode[];
    onRemove: (pathsToRemove: string[]) => void;
}

const SelectedFilesView: React.FC<SelectedFilesViewProps> = ({ selectedFileNodes, onRemove }) => {
    const [sortColumn, setSortColumn] = useState<SortableColumn>('tokenCount');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const [itemsToRemove, setItemsToRemove] = useState<Set<string>>(new Set());

    const sortedFiles = useMemo(() => {
        return [...selectedFileNodes].sort((a, b) => {
            const dir = sortDirection === 'asc' ? 1 : -1;
            if (sortColumn === 'name') {
                return a.name.localeCompare(b.name) * dir;
            }
            return (a.tokenCount - b.tokenCount) * dir;
        });
    }, [selectedFileNodes, sortColumn, sortDirection]);

    const handleSort = (column: SortableColumn) => {
        if (column === sortColumn) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('desc');
        }
    };

    const handleToggleRemove = (path: string, checked: boolean) => {
        setItemsToRemove(prev => {
            const newSet = new Set(prev);
            if (checked) {
                newSet.add(path);
            } else {
                newSet.delete(path);
            }
            return newSet;
        });
    };

    const handleRemoveSelected = () => {
        onRemove(Array.from(itemsToRemove));
        setItemsToRemove(new Set());
    };
    
    const SortIndicator = ({ column }: { column: SortableColumn }) => {
        if (sortColumn !== column) return null;
        return sortDirection === 'asc' ? <VscChevronUp /> : <VscChevronDown />;
    };

    return (
        <div className="selected-files-panel">
            <div className="panel-header">
                <span>Selected Items</span>
                <span className="token-label">Tokens</span>
            </div>
            <div className="panel-toolbar">
                <button onClick={handleRemoveSelected} disabled={itemsToRemove.size === 0}>
                    Remove selected ({itemsToRemove.size})
                </button>
            </div>
            <div className="selected-files-list-container">
                <div className="selected-list-header">
                    <div className="header-name" onClick={() => handleSort('name')}>
                        <VscSymbolFile /> File <SortIndicator column="name" />
                    </div>
                    <div className="header-tokens" onClick={() => handleSort('tokenCount')}>
                        <VscSymbolNumeric /> Tokens <SortIndicator column="tokenCount" />
                    </div>
                </div>
                <ul className="selected-files-list">
                    {sortedFiles.map(node => (
                        <li key={node.absolutePath}>
                            <Checkbox
                                checked={itemsToRemove.has(node.absolutePath)}
                                onChange={(checked) => handleToggleRemove(node.absolutePath, checked)}
                            />
                            <span className="file-icon">{getFileIcon(node.name)}</span>
                            <span className="file-name" title={node.absolutePath}>{node.name}</span>
                            <span className="file-tokens">{formatLargeNumber(node.tokenCount, 1)}</span>
                            <button className="remove-button" onClick={() => onRemove([node.absolutePath])} title="Remove from selection">
                                <VscClose />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SelectedFilesView;
</file>

<file path="src/client/components/tree-view/TreeView.tsx">
import React, { useState, useEffect } from 'react';
import { VscChevronRight } from 'react-icons/vsc';

export interface TreeNode {
    name: string;
    absolutePath: string;
    children?: TreeNode[];
    isExpanded?: boolean;
    [key: string]: any;
}

interface TreeViewProps {
    data: TreeNode[];
    renderNodeContent?: (node: TreeNode, isExpanded: boolean) => React.ReactNode;
    collapseTrigger?: number;
    onContextMenu?: (event: React.MouseEvent, node: TreeNode) => void;
}

const TreeView: React.FC<TreeViewProps> = ({ data, renderNodeContent, collapseTrigger = 0, onContextMenu }) => {
    const [expandedNodes, setExpandedNodes] = useState<string[]>([]);

    useEffect(() => {
        if (data.length > 0) {
            const rootNode = data[0];
            if (rootNode) {
                setExpandedNodes([rootNode.absolutePath]);
            }
        }
    }, [data]);

    useEffect(() => {
        if (collapseTrigger > 0 && data.length > 0) {
            const rootNode = data[0];
            if (rootNode) {
                setExpandedNodes([rootNode.absolutePath]);
            }
        }
    }, [collapseTrigger]);


    const handleToggleNode = (e: React.MouseEvent, nodePath: string) => {
        if ((e.target as HTMLElement).closest('.file-checkbox') || (e.target as HTMLElement).closest('.rename-input')) {
            return;
        }
        e.stopPropagation();
        setExpandedNodes((prevExpandedNodes) => {
            const isExpanded = prevExpandedNodes.includes(nodePath);
            return isExpanded
                ? prevExpandedNodes.filter((n) => n !== nodePath)
                : [...prevExpandedNodes, nodePath];
        });
    };

    const renderTreeNodes = (nodes: TreeNode[]) => {
        return nodes.map((node) => {
            const isExpanded = expandedNodes.includes(node.absolutePath);
            const isDirectory = !!(node.children && node.children.length > 0);

            return (
                <li key={node.absolutePath} className="treenode-li">
                    <div
                        className={`treenode-item-wrapper`}
                        onClick={(e) => isDirectory && handleToggleNode(e, node.absolutePath)}
                        onContextMenu={(e) => onContextMenu?.(e, node)}
                    >
                        <span 
                            className={`treenode-chevron ${isExpanded ? 'expanded' : ''}`}
                        >
                            {isDirectory && <VscChevronRight />}
                        </span>
                        <div className="treenode-content">
                            {renderNodeContent ? renderNodeContent(node, isExpanded) : node.name}
                        </div>
                    </div>
                    {isDirectory && isExpanded && (
                        <ul className="treenode-children">{renderTreeNodes(node.children)}</ul>
                    )}
                </li>
            );
        });
    };

    return (
        <div className="tree-view">
            <ul>{renderTreeNodes(data)}</ul>
        </div>
    );
};

export default TreeView;
</file>

<file path="src/client/components/tree-view/TreeView.utils.ts">
import { TreeNode } from "./TreeView";

export const getExpandedNodes = (data: TreeNode[]): string[] => {
  return data.reduce((acc: string[], node) => {
    if (node.isExpanded) {
      acc.push(node.absolutePath);
    }
    if (node.children) {
      acc.push(...getExpandedNodes(node.children));
    }
    return acc;
  }, []);
};
</file>

<file path="src/client/utils/logger.ts">
import { ClientPostMessageManager } from "@/common/ipc/client-ipc";
import { ClientToServerChannel } from "@/common/ipc/channels.enum";

const clientIpc = ClientPostMessageManager.getInstance();

export const logger = {
    log: (message: string) => {
        console.log(message); // Also log to dev console
        clientIpc.sendToServer(ClientToServerChannel.LogMessage, { level: 'info', message });
    },
    warn: (message: string) => {
        console.warn(message);
        clientIpc.sendToServer(ClientToServerChannel.LogMessage, { level: 'warn', message });
    },
    error: (message: string) => {
        console.error(message);
        clientIpc.sendToServer(ClientToServerChannel.LogMessage, { level: 'error', message });
    }
};
</file>

<file path="src/client/views/context-chooser.view/index.ts">
import { onMessage } from "./on-message";

export const viewConfig = {
    entry: "contextChooserView.js",
    type: "viewType.sidebar.contextChooser",
    handleMessage: onMessage,
};
</file>

<file path="src/client/views/context-chooser.view/on-message.ts">
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { ClientToServerChannel } from "@/common/ipc/channels.enum";
import { Services } from "@/backend/services/services";
import * as vscode from "vscode";

export function onMessage(serverIpc: ServerPostMessageManager) {
    const fsService = Services.fsService;
    const flattenerService = Services.flattenerService;
    const loggerService = Services.loggerService;

    serverIpc.onClientMessage(ClientToServerChannel.RequestWorkspaceFiles, (data) =>
        fsService.handleWorkspaceFilesRequest(serverIpc, data.force)
    );

    serverIpc.onClientMessage(ClientToServerChannel.RequestFlattenContext, (data) => {
        flattenerService.flatten(data.selectedPaths);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestNewFile, (data) => {
        fsService.handleNewFileRequest(data.parentDirectory);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestNewFolder, (data) => {
        fsService.handleNewFolderRequest(data.parentDirectory);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestFileRename, (data) => {
        fsService.handleFileRenameRequest(data.oldPath, data.newName);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestFileDelete, (data) => {
        fsService.handleFileDeleteRequest(data.path);
    });
    
    serverIpc.onClientMessage(ClientToServerChannel.RequestRevealInExplorer, (data) => {
        fsService.handleRevealInExplorerRequest(data.path);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestCopyPath, (data) => {
        fsService.handleCopyPathRequest(data.path, data.relative);
    });


    serverIpc.onClientMessage(ClientToServerChannel.LogMessage, (data) => {
        const { level, message } = data;
        const logMessage = `[WebView] ${message}`;
        switch (level) {
            case 'warn':
                loggerService.warn(logMessage);
                break;
            case 'error':
                loggerService.error(logMessage);
                break;
            case 'info':
            default:
                loggerService.log(logMessage);
                break;
        }
    });
}
</file>

<file path="src/client/views/context-chooser.view/view.scss">
/* Updated on: C21 (Add styles for context menu) */
body {
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 13px;
    color: var(--vscode-editor-foreground);
    background-color: var(--vscode-sideBar-background);
}

.view-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.view-header {
    padding: 4px 8px;
    border-bottom: 1px solid var(--vscode-panel-border);
    display: flex;
    justify-content: flex-end;
    flex-shrink: 0;
}

.toolbar {
    display: flex;
    gap: 4px;
    
    button {
        background: none;
        border: none;
        color: var(--vscode-icon-foreground);
        cursor: pointer;
        padding: 4px;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            background-color: var(--vscode-toolbar-hoverBackground);
        }
    }
}

.selected-files-panel {
    border-top: 1px solid var(--vscode-panel-border);
    max-height: 33vh; 
    display: flex;
    flex-direction: column;
    flex-shrink: 0; 
}

.panel-header {
    font-weight: bold;
    padding: 4px 8px;
    font-size: 11px;
    text-transform: uppercase;
    color: var(--vscode-sideBar-titleForeground);
    border-bottom: 1px solid var(--vscode-panel-border);
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
}

.selected-files-list {
    list-style: none;
    padding: 0;
    margin: 0;
    overflow-y: auto;
    flex-grow: 1;

    li {
        display: flex;
        align-items: center;
        padding: 2px 8px;
        font-size: 12px;
        gap: 8px;

        &:hover {
            background-color: var(--vscode-list-hoverBackground);
        }

        .file-name {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            flex-grow: 1;
        }

        .file-tokens {
            color: var(--vscode-descriptionForeground);
            font-variant-numeric: tabular-nums;
        }

        .remove-button {
            background: none;
            border: none;
            color: var(--vscode-icon-foreground);
            cursor: pointer;
            visibility: hidden; 
        }
    }

    li:hover .remove-button {
        visibility: visible; 
    }
}


.file-tree-container {
    flex-grow: 1; 
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 5px;
}

.view-footer {
    padding: 8px;
    border-top: 1px solid var(--vscode-panel-border);
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex-shrink: 0;
}

.flatten-button {
    width: 100%;
    padding: 6px;
    border: 1px solid var(--vscode-button-border, var(--vscode-focusBorder));
    background-color: var(--vscode-button-background);
    color: var(--vscode-button-foreground);
    cursor: pointer;
    border-radius: 2px;
}

.flatten-button:hover {
    background-color: var(--vscode-button-hoverBackground);
}

.loading-message {
    padding: 8px;
    color: var(--vscode-descriptionForeground);
}

.summary-panel {
    font-size: 12px;
    color: var(--vscode-descriptionForeground);
    display: flex;
    justify-content: space-between;
    gap: 12px;
}

.summary-item {
    display: flex;
    align-items: center;
    gap: 4px;
}

.tree-view {
    ul {
        list-style-type: none;
        margin: 0;
        padding-left: 0;
    }

    ul.treenode-children {
        padding-left: 10px; 
    }
}


.treenode-li {
    position: relative;
}

.treenode-item-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 1px 4px;
    border-radius: 3px;
    min-height: 22px;
}

.treenode-item-wrapper:hover {
    background-color: var(--vscode-list-hoverBackground);
}

.treenode-chevron {
    flex-shrink: 0;
    width: 20px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.1s ease-in-out;
}

.treenode-chevron.expanded {
    transform: rotate(90deg);
}

.treenode-content {
    flex-grow: 1;
    display: flex;
    align-items: center;
    overflow: hidden;
}


.file-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1px;
    gap: 6px;
}

.file-item.active {
    background-color: var(--vscode-list-activeSelectionBackground);
    color: var(--vscode-list-activeSelectionForeground);
}

.file-checkbox {
    cursor: pointer;
    flex-shrink: 0;
}

.file-icon {
    display: flex;
    align-items: center;
    font-size: 16px;
    flex-shrink: 0;
}

.file-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 1;
}

.file-stats {
    margin-left: auto;
    padding-left: 8px;
    font-size: 11px;
    color: var(--vscode-descriptionForeground);
    flex-shrink: 0;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: flex-end;
    text-align: right;
}

.file-stats > * {
    display: flex;
    align-items: center;
    gap: 3px;
}

/* Context Menu Styles */
.context-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
}

.context-menu {
    position: absolute;
    background-color: var(--vscode-menu-background);
    border: 1px solid var(--vscode-menu-border);
    color: var(--vscode-menu-foreground);
    box-shadow: 0 2px 8px var(--vscode-widget-shadow);
    border-radius: 4px;
    padding: 4px 0;
    min-width: 180px;
    z-index: 1000;

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        padding: 4px 12px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;

        &:hover {
            background-color: var(--vscode-menu-selectionBackground);
            color: var(--vscode-menu-selectionForeground);
        }
    }

    hr {
        border: none;
        border-top: 1px solid var(--vscode-menu-separatorBackground);
        margin: 4px 0;
    }
}

.rename-input {
    background-color: var(--vscode-input-background);
    color: var(--vscode-input-foreground);
    border: 1px solid var(--vscode-focusBorder);
    outline: none;
    width: 100%;
    padding: 0;
    margin: 0;
    font-size: inherit;
    font-family: inherit;
}
</file>

<file path="src/client/views/context-chooser.view/view.tsx">
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import { FileNode } from '@/common/types/file-node';
import FileTree from '../../components/file-tree/FileTree';
import { useState, useEffect, useMemo } from 'react';
import { formatLargeNumber, formatNumberWithCommas } from '@/common/utils/formatting';
import { VscFiles, VscSymbolNumeric, VscCollapseAll, VscRefresh, VscNewFile, VscNewFolder } from 'react-icons/vsc';
import { logger } from '@/client/utils/logger';
import SelectedFilesView from '@/client/components/SelectedFilesView';
import { removePathsFromSelected } from '@/client/components/file-tree/FileTree.utils';

const App = () => {
    const [files, setFiles] = useState<FileNode[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [activeFile, setActiveFile] = useState<string | undefined>();
    const [collapseTrigger, setCollapseTrigger] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    
    const clientIpc = ClientPostMessageManager.getInstance();

    const requestFiles = (force = false) => {
        setIsLoading(true);
        logger.log(`Requesting workspace files (force=${force}).`);
        clientIpc.sendToServer(ClientToServerChannel.RequestWorkspaceFiles, { force });
    };

    useEffect(() => {
        logger.log("Initializing view and requesting workspace files.");
        clientIpc.sendToServer(ClientToServerChannel.RequestWorkspaceFiles, {});

        const handleFileResponse = ({ files: receivedFiles }: { files: FileNode[] }) => {
            logger.log(`Received file tree from backend. Root node: ${receivedFiles[0]?.name}`);
            setFiles(receivedFiles);
            setIsLoading(false);
        };
        clientIpc.onServerMessage(ServerToClientChannel.SendWorkspaceFiles, handleFileResponse);

        const handleApplySelectionSet = ({ paths }: { paths: string[] }) => {
            logger.log(`Applying selection set with ${paths.length} paths.`);
            setSelectedFiles(paths);
        };
        clientIpc.onServerMessage(ServerToClientChannel.ApplySelectionSet, handleApplySelectionSet);

    }, []);

    const handleFileClick = (filePath: string) => {
        setActiveFile(filePath);
    };

    const updateSelectedFiles = (newSelectedFiles: string[]) => {
        setSelectedFiles(newSelectedFiles);
    };

    const handleFlattenClick = () => {
        logger.log(`Flatten Context button clicked with ${selectedFiles.length} paths.`);
        clientIpc.sendToServer(ClientToServerChannel.RequestFlattenContext, { selectedPaths: selectedFiles });
    };

    const handleRefresh = () => {
        logger.log("Refresh button clicked.");
        requestFiles(true);
    };

    const handleCollapseAll = () => {
        logger.log("Collapse All button clicked.");
        setCollapseTrigger(c => c + 1);
    };

    const handleNewFile = () => {
        const parentDirectory = files.length > 0 ? files[0].absolutePath : '';
        logger.log(`Requesting new file in ${parentDirectory}`);
        clientIpc.sendToServer(ClientToServerChannel.RequestNewFile, { parentDirectory });
    };

    const handleNewFolder = () => {
        const parentDirectory = files.length > 0 ? files[0].absolutePath : '';
        logger.log(`Requesting new folder in ${parentDirectory}`);
        clientIpc.sendToServer(ClientToServerChannel.RequestNewFolder, { parentDirectory });
    };

    const handleRemoveFromSelection = (pathsToRemove: string[]) => {
        const newSelected = removePathsFromSelected(pathsToRemove, selectedFiles, files);
        setSelectedFiles(newSelected);
    };

    const { totalFiles, totalTokens, selectedFileNodes } = useMemo(() => {
        let totalTokens = 0;
        let totalFiles = 0;
        const selectedFileSet = new Set<string>();
        const selectedTextNodes: FileNode[] = [];

        const fileMap: Map<string, FileNode> = new Map();
        const buildFileMap = (node: FileNode) => {
            fileMap.set(node.absolutePath, node);
            if (node.children) {
                node.children.forEach(buildFileMap);
            }
        };
        files.forEach(buildFileMap);

        const addNodeAndDescendants = (node: FileNode) => {
            if (!node.children) {
                if (!selectedFileSet.has(node.absolutePath)) {
                    selectedFileSet.add(node.absolutePath);
                    if (!node.isImage) {
                       totalTokens += node.tokenCount;
                       selectedTextNodes.push(node);
                    }
                    totalFiles++;
                }
            } else {
                node.children.forEach(child => addNodeAndDescendants(child));
            }
        };

        selectedFiles.forEach(path => {
            const node = fileMap.get(path);
            if (node) {
                addNodeAndDescendants(node);
            }
        });
        
        return { totalFiles, totalTokens, selectedFileNodes: selectedTextNodes };
    }, [selectedFiles, files]);

    return (
        <div className="view-container">
            <div className="view-header">
                 <div className="toolbar">
                    <button onClick={handleNewFile} title="New File..."><VscNewFile /></button>
                    <button onClick={handleNewFolder} title="New Folder..."><VscNewFolder /></button>
                    <button onClick={handleRefresh} title="Refresh Explorer"><VscRefresh /></button>
                    <button onClick={handleCollapseAll} title="Collapse Folders in View"><VscCollapseAll /></button>
                 </div>
            </div>
            <div className="file-tree-container">
                {isLoading ? (
                     <div className="loading-message">Loading file tree...</div>
                ) : files.length > 0 ? (
                    files.map((rootNode, index) => (
                        <FileTree
                            key={index}
                            data={[rootNode]}
                            onFileClick={handleFileClick}
                            selectedFiles={selectedFiles}
                            updateSelectedFiles={updateSelectedFiles}
                            activeFile={activeFile}
                        />
                    ))
                ) : (
                    <div className="loading-message">No folder open.</div>
                )}
            </div>
            <SelectedFilesView selectedFileNodes={selectedFileNodes} onRemove={handleRemoveFromSelection} />
            <div className="view-footer">
                <div className="summary-panel">
                    <span className='summary-item' title="Total selected files">
                        <VscFiles />
                        {formatNumberWithCommas(totalFiles)}
                    </span>
                    <span className='summary-item' title="Total tokens in selected text files">
                        <VscSymbolNumeric />
                        {formatLargeNumber(totalTokens, 1)}
                    </span>
                </div>
                <button className="flatten-button" onClick={handleFlattenClick}>
                    Flatten Context
                </button>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
</file>

<file path="src/client/views/index.ts">
import { viewConfig as contextChooserViewConfig } from "./context-chooser.view";
import * as vscode from "vscode";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { getNonce, getViewHtml } from "@/common/utils/view-html";

export const views = [contextChooserViewConfig];
export const serverIPCs: Record<string, ServerPostMessageManager> = {};

export function registerViews(context: vscode.ExtensionContext) {
    views.forEach((viewConfig) => {
        context.subscriptions.push(
            vscode.window.registerWebviewViewProvider(viewConfig.type, {
                resolveWebviewView: (webviewView) => {
                    webviewView.webview.options = {
                        enableScripts: true,
                        localResourceRoots: [context.extensionUri],
                    };
                    const nonce = getNonce();
                    webviewView.webview.html = getViewHtml({
                        webview: webviewView.webview,
                        nonce,
                        scriptUri: webviewView.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "dist", viewConfig.entry)).toString(),
                    });
                    const serverIpc = ServerPostMessageManager.getInstance(
                        webviewView.webview.onDidReceiveMessage,
                        (data: any) => webviewView.webview.postMessage(data)
                    );
                    serverIPCs[viewConfig.type] = serverIpc;
                    viewConfig.handleMessage(serverIpc);
                },
            })
        );
    });
}
</file>

<file path="src/common/ipc/channels.enum.ts">
export enum ClientToServerChannel {
    RequestFlattenContext = "clientToServer.requestFlattenContext",
    RequestWorkspaceFiles = "clientToServer.requestWorkspaceFiles",
    RequestRefresh = "clientToServer.requestRefresh",
    LogMessage = "clientToServer.logMessage", // For logging from webview

    // File Operations
    RequestNewFile = "clientToServer.requestNewFile",
    RequestNewFolder = "clientToServer.requestNewFolder",
    RequestFileRename = "clientToServer.requestFileRename",
    RequestFileDelete = "clientToServer.requestFileDelete",
    RequestRevealInExplorer = "clientToServer.requestRevealInExplorer",
    RequestCopyPath = "clientToServer.requestCopyPath",
}

export enum ServerToClientChannel {
    SendWorkspaceFiles = "serverToClient.sendWorkspaceFiles",
    ApplySelectionSet = "serverToClient.applySelectionSet",
    SendSelectionSets = "serverToClient.sendSelectionSets",
    ForceRefresh = "serverToClient.forceRefresh", // Backend tells frontend to refresh
}
</file>

<file path="src/common/ipc/channels.type.ts">
import { FileNode } from "@/common/types/file-node";
import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";

export type SelectionSet = { [name: string]: string[] };

export type ChannelBody<T extends ClientToServerChannel | ServerToClientChannel> =
    T extends ClientToServerChannel.RequestFlattenContext ? { selectedPaths: string[] } :
    T extends ClientToServerChannel.RequestWorkspaceFiles ? { force?: boolean } :
    T extends ClientToServerChannel.RequestRefresh ? {} :
    T extends ClientToServerChannel.LogMessage ? { level: 'info' | 'warn' | 'error', message: string } :
    T extends ClientToServerChannel.RequestNewFile ? { parentDirectory: string } :
    T extends ClientToServerChannel.RequestNewFolder ? { parentDirectory: string } :
    T extends ClientToServerChannel.RequestFileRename ? { oldPath: string, newName: string } :
    T extends ClientToServerChannel.RequestFileDelete ? { path: string } :
    T extends ClientToServerChannel.RequestRevealInExplorer ? { path: string } :
    T extends ClientToServerChannel.RequestCopyPath ? { path: string, relative: boolean } :
    
    T extends ServerToClientChannel.SendWorkspaceFiles ? { files: FileNode[] } :
    T extends ServerToClientChannel.ApplySelectionSet ? { paths: string[] } :
    T extends ServerToClientChannel.SendSelectionSets ? { sets: SelectionSet } :
    T extends ServerToClientChannel.ForceRefresh ? {} :
    never;
</file>

<file path="src/common/ipc/client-ipc.ts">
import getVscode from "./get-vscode-api";
import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";
import { ChannelBody } from "./channels.type";

export class ClientPostMessageManager {
    private static _instance?: ClientPostMessageManager;
    private _listeners: {
        channel: ServerToClientChannel,
        callback: (body: ChannelBody<ServerToClientChannel>) => void
    }[];

    private constructor() {
        this._listeners = [];
        window.addEventListener('message', (event: MessageEvent) => {
            const data = event.data;
            this._listeners.forEach((listener) => {
                if (listener.channel === data.channel) {
                    listener.callback(data.body);
                }
            });
        });
    }

    static getInstance(): ClientPostMessageManager {
        if (!ClientPostMessageManager._instance) {
            ClientPostMessageManager._instance = new ClientPostMessageManager();
        }
        return ClientPostMessageManager._instance;
    }

    sendToServer<T extends ClientToServerChannel>(channel: T, body: ChannelBody<T>): void {
        getVscode().postMessage({ channel, body });
    }

    onServerMessage<T extends ServerToClientChannel>(channel: T, callback: (body: ChannelBody<T>) => void): void {
        this._listeners.push({ channel, callback: callback as any });
    }
}
</file>

<file path="src/common/ipc/get-vscode-api.ts">
import { WebviewApi } from "../types/vscode-webview";

let vscode: WebviewApi<unknown> | null = null;

const getVscode = () => {
    if (!vscode) {
        vscode = acquireVsCodeApi();
    }
    return vscode;
};

export default getVscode;
</file>

<file path="src/common/ipc/server-ipc.ts">
import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";
import { ChannelBody } from "./channels.type";

export class ServerPostMessageManager {
    private static _instance?: ServerPostMessageManager;
    private _listeners: {
        channel: ClientToServerChannel,
        callback: (body: ChannelBody<ClientToServerChannel>) => void
    }[];

    private constructor(
        private onMessage: (data: any) => void,
        private sendMessage: (message: any) => void
    ) {
        this._listeners = [];
        this.onMessage((data: any) => {
            this._listeners.forEach((listener) => {
                if (listener.channel === data.channel) {
                    listener.callback(data.body);
                }
            });
        });
    }

    static getInstance(onMessage?: (data: any) => void, sendMessage?: (message: any) => void) {
        if (onMessage && sendMessage) {
            ServerPostMessageManager._instance = new ServerPostMessageManager(onMessage, sendMessage);
        }
        if (!ServerPostMessageManager._instance) {
            throw new Error("ServerPostMessageManager not initialized");
        }
        return ServerPostMessageManager._instance;
    }

    sendToClient<T extends ServerToClientChannel>(channel: T, body: ChannelBody<T>): void {
        this.sendMessage({ channel, body });
    }

    onClientMessage<T extends ClientToServerChannel>(channel: T, callback: (body: ChannelBody<T>) => void): void {
        this._listeners.push({ channel, callback: callback as any });
    }
}
</file>

<file path="src/common/types/file-node.ts">
export interface FileNode {
    name: string;
    absolutePath: string;
    children?: FileNode[];
    tokenCount: number;
    fileCount: number; // For directories, this is the count of files inside. For files, it's 1.
    isImage: boolean;
    sizeInBytes: number;
}
</file>

<file path="src/common/types/vscode-webview.d.ts">
export interface WebviewApi<StateType> {
    postMessage(message: unknown): void;
    getState(): StateType | undefined;
    setState<T extends StateType | undefined>(newState: T): T;
}

declare global {
    function acquireVsCodeApi<StateType = unknown>(): WebviewApi<StateType>;
}
</file>

<file path="src/common/utils/formatting.ts">
// src/common/utils/formatting.ts

const KMBT_SUFFIXES = ['', 'K', 'M', 'B', 'T', 'Q']; // Extend as needed

/**
 * Formats a large number with appropriate K/M/B/T suffixes and dynamic decimal places.
 *
 * @param value The number to format.
 * @param decimalPlaces The base number of decimal places to aim for.
 * @returns A formatted string.
 */
export function formatLargeNumber(value: number | undefined | null, decimalPlaces: number = 1): string {
    if (value === null || value === undefined || isNaN(value) || !Number.isFinite(value)) {
        return '---';
    }
    if (value === 0) {
        return '0';
    }

    const isNegative = value < 0;
    const absValue = Math.abs(value);

    if (absValue < 1000) {
        return String(Math.round(value)); // Return whole number if less than 1000
    }

    let unitIndex = 0;
    let scaledValue = absValue;

    unitIndex = Math.floor(Math.log10(absValue) / 3);
    unitIndex = Math.min(unitIndex, KMBT_SUFFIXES.length - 1);
    scaledValue = absValue / Math.pow(1000, unitIndex);

    let adjustedDecimalPlaces = decimalPlaces;
    if (scaledValue >= 100) adjustedDecimalPlaces = 0;
    else if (scaledValue >= 10) adjustedDecimalPlaces = 1;
    else adjustedDecimalPlaces = 2;


    const unit = KMBT_SUFFIXES[unitIndex] ?? '';
    let formattedValue = scaledValue.toFixed(adjustedDecimalPlaces);
    
    // Remove trailing .00 or .0
    if (adjustedDecimalPlaces > 0 && formattedValue.endsWith('0')) {
        formattedValue = formattedValue.replace(/\.?0+$/, '');
    }


    return `${isNegative ? '-' : ''}${formattedValue}${unit}`;
}

/**
 * Formats a number with commas as thousands separators.
 * @param value The number to format.
 * @returns A formatted string with commas.
 */
export function formatNumberWithCommas(value: number | undefined | null): string {
    if (value === null || value === undefined || isNaN(value)) {
        return '---';
    }
    return value.toLocaleString();
}

/**
 * Formats a file size in bytes into a human-readable string (KB, MB, GB, etc.).
 * @param bytes The number of bytes.
 * @param decimals The number of decimal places to use.
 * @returns A formatted string representing the file size.
 */
export function formatBytes(bytes: number, decimals: number = 1): string {
    if (bytes === 0) return '0 Bytes';
    if (isNaN(bytes)) return '---';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
</file>

<file path="src/common/utils/view-html.ts">
import * as vscode from "vscode";

export function getViewHtml({ webview, nonce, scriptUri }: { webview: vscode.Webview; nonce: string; scriptUri: string; }): string {
    return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}';">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
            <div id="root"></div>
            <script nonce="${nonce}" src="${scriptUri}"></script>
        </body>
        </html>`;
}

function getNonce() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
export { getNonce };
</file>

<file path="src/common/view-types.ts">
export const VIEW_TYPES = {
  SIDEBAR: {
    CHAT: "viewType.sidebar.chat",
    FILE_EXPLORER: "viewType.sidebar.fileExplorer",
    CHANGE_PLAN: "viewType.sidebar.changePlan",
    CONTEXT_CHOOSER: "viewType.sidebar.contextChooser",
  },
};
</file>

<file path="src/extension.ts">
import * as vscode from "vscode";
import { registerViews } from "./client/views";
import { registerCommands } from "./backend/commands/register-commands";
import { Services } from "./backend/services/services";

let globalContext: vscode.ExtensionContext | null = null;

export function activate(context: vscode.ExtensionContext) {
    // For debugging the activation process itself
    console.log('DCE Extension: Activating...');

    globalContext = context;

    try {
        Services.initialize();
        console.log('DCE Extension: Services initialized.');
    } catch (error) {
        console.error('DCE Extension: CRITICAL - Error initializing services.', error);
        vscode.window.showErrorMessage("Data Curation Environment failed to initialize services. Check the debug console.");
        return;
    }
    
    try {
        registerCommands(context);
        console.log('DCE Extension: Commands registered.');
    } catch (error) {
        console.error('DCE Extension: CRITICAL - Error registering commands.', error);
        vscode.window.showErrorMessage("Data Curation Environment failed to register commands. Check the debug console.");
    }

    try {
        registerViews(context);
        console.log('DCE Extension: Views registered.');
    } catch (error) {
        console.error('DCE Extension: CRITICAL - Error registering views.', error);
         vscode.window.showErrorMessage("Data Curation Environment failed to register views. Check the debug console.");
    }
    
    Services.loggerService.log('Congratulations, your extension "Data Curation Environment" is now active!');
    console.log('Congratulations, your extension "Data Curation Environment" is now active!');
}

export function getContext() {
    if (!globalContext) {
        throw new Error("Extension context not available.");
    }
    return globalContext;
}

export function deactivate() {
    console.log('DCE Extension: Deactivating.');
}
</file>

<file path="The-Creator-AI-main/.eslintrc.json">
{
    "root": true,
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/naming-convention": [
            "warn",
            {
                "selector": "import",
                "format": [ "camelCase", "PascalCase" ]
            }
        ],
        "@typescript-eslint/semi": "warn",
        "curly": "warn",
        "eqeqeq": "warn",
        "no-throw-literal": "warn",
        "semi": "off"
    },
    "ignorePatterns": [
        "out",
        "dist",
        "**/*.d.ts"
    ]
}
</file>

<file path="The-Creator-AI-main/.gitignore">
.DS_Store
out
dist
node_modules
.vscode-test/
*.vsix
*.llm
*.code-workspace
</file>

<file path="The-Creator-AI-main/.vscode-test.mjs">
import { defineConfig } from '@vscode/test-cli';

export default defineConfig({
	files: 'out/test/**/*.test.js',
});
</file>

<file path="The-Creator-AI-main/.vscodeignore">
.vscode/**
.vscode-test/**
out/**
node_modules/**
src/**
.gitignore
.yarnrc
webpack.config.js
vsc-extension-quickstart.md
**/tsconfig.json
**/.eslintrc.json
**/*.map
**/*.ts
**/.vscode-test.*
</file>

<file path="The-Creator-AI-main/CHANGELOG.md">
# Change Log

All notable changes to the "the-creator-ai" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

- Initial release
</file>

<file path="The-Creator-AI-main/LICENSE">
MIT License

Copyright (c) 2024 Saoud Rizwan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</file>

<file path="The-Creator-AI-main/Notes.md">
[Notes](https://github.com/The-Creator-AI/The-Creator-AI/issues/4)
</file>

<file path="The-Creator-AI-main/package.json">
{
  "name": "the-creator-ai",
  "publisher": "PulkitSingh",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/The-Creator-AI/the-Creator-AI"
  },
  "displayName": "The Creator AI",
  "description": "Coding assistant",
  "version": "0.1.3",
  "engines": {
    "vscode": "^1.90.0"
  },
  "categories": [
    "Other"
  ],
  "activationEvents": [],
  "main": "./dist/extension.js",
  "contributes": {
    "configuration": {
      "title": "Creator Extension",
      "properties": {
        "creatorExtension.llmRepository": {
          "type": "object",
          "description": "Configuration for LLM services"
        },
        "creatorExtension.chatRepository": {
          "type": "object",
          "description": "Chat repository data"
        }
      }
    },
    "commands": [
      {
        "command": "the-creator-ai.helloWorld",
        "title": "Creator AI: Hello World"
      },
      {
        "command": "the-creator-ai.resetClearChangePlanViewState",
        "title": "Creator AI: Clear Change Plan View State"
      },
      {
        "command": "the-creator-ai.chooseChangePlan",
        "title": "Creator AI: Choose Change Plan",
        "icon": "$(history)"
      },
      {
        "command": "the-creator-ai.newPlan",
        "title": "Creator AI: New Plan",
        "icon": "$(sync)"
      },
      {
        "command": "the-creator-ai.clearHistory",
        "title": "Creator AI: Clear History"
      },
      {
        "command": "the-creator-ai.exportChangePlan",
        "title": "Creator AI: Export Change Plan",
        "icon": "$(cloud-upload)"
      },
      {
        "command": "the-creator-ai.importChangePlan",
        "title": "Creator AI: Import Change Plan",
        "icon": "$(cloud-download)"
      }
    ],
    "viewsContainers": {
      "activitybar": [
        {
          "id": "the-creator-ai",
          "title": "Creator AI",
          "icon": "public/spiral.svg"
        }
      ]
    },
    "views": {
      "the-creator-ai": [
        {
          "type": "webview",
          "id": "viewType.sidebar.changePlan",
          "name": "Change Plan"
        }
      ]
    },
    "menus": {
      "view/title": [
        {
          "command": "the-creator-ai.chooseChangePlan",
          "when": "view == viewType.sidebar.changePlan",
          "group": "navigation",
          "title": "Choose Plan"
        },
        {
          "command": "the-creator-ai.newPlan",
          "when": "view == viewType.sidebar.changePlan",
          "group": "navigation",
          "title": "New Plan"
        },
        {
          "command": "the-creator-ai.exportChangePlan",
          "when": "view == viewType.sidebar.changePlan",
          "group": "navigation",
           "title": "Export Plan"
        },
        {
          "command": "the-creator-ai.importChangePlan",
          "when": "view == viewType.sidebar.changePlan",
          "group": "navigation",
           "title": "Import Plan"
        }
      ]
    }
  },
  "scripts": {
    "vscode:prepublish": "npm run package",
    "compile": "webpack",
    "watch": "webpack --watch",
    "package": "webpack --mode production --devtool hidden-source-map",
    "compile-tests": "tsc -p . --outDir out",
    "watch-tests": "tsc -p . -w --outDir out",
    "pretest": "npm run compile-tests && npm run compile && npm run lint",
    "lint": "eslint src --ext ts",
    "test": "vscode-test",
    "vsce-package": "vsce package"
  },
  "devDependencies": {
    "@babel/core": "^7.24.7",
    "@babel/preset-env": "^7.24.7",
    "@babel/preset-react": "^7.24.7",
    "@babel/preset-typescript": "^7.24.7",
    "@types/mocha": "^10.0.6",
    "@types/node": "18.x",
    "@types/react-dom": "^18.3.0",
    "@types/vscode": "^1.90.0",
    "@typescript-eslint/eslint-plugin": "^7.7.1",
    "@typescript-eslint/parser": "^7.7.1",
    "@vscode/test-cli": "^0.0.9",
    "@vscode/test-electron": "^2.3.9",
    "autoprefixer": "^10.4.20",
    "babel-loader": "^9.1.3",
    "copy-webpack-plugin": "^12.0.2",
    "css-loader": "^7.1.2",
    "eslint": "^8.57.0",
    "node-sass": "^9.0.0",
    "postcss": "^8.4.45",
    "postcss-loader": "^8.1.1",
    "postcss-preset-env": "^10.0.3",
    "process": "^0.11.10",
    "sass": "^1.78.0",
    "sass-loader": "^16.0.1",
    "style-loader": "^4.0.0",
    "tailwindcss": "^3.4.10",
    "ts-loader": "^9.5.1",
    "typescript": "^5.4.5",
    "vsce": "^2.15.0",
    "webpack": "^5.91.0",
    "webpack-cli": "^5.1.4"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.27.0",
    "@anthropic-ai/tokenizer": "^0.0.4",
    "@google/generative-ai": "^0.12.0",
    "@vscode/webview-ui-toolkit": "^1.4.0",
    "axios": "^1.7.5",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "firebase": "^10.13.2",
    "injection-js": "^2.4.0",
    "markdown-to-jsx": "^7.5.0",
    "openai": "^4.56.0",
    "puppeteer": "^23.2.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-icons": "^5.3.0",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1",
    "tiktoken": "^1.0.16",
    "uuid": "^10.0.0"
  }
}
</file>

<file path="The-Creator-AI-main/postcss.config.js">
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
</file>

<file path="The-Creator-AI-main/public/main.css">
body {
	background-color: transparent;
}

.color-list {
	list-style: none;
	padding: 0;
}

.color-entry {
	width: 100%;
	display: flex;
	margin-bottom: 0.4em;
	border: 1px solid var(--vscode-input-border);
}

.color-preview {
	width: 2em;
	height: 2em;
}

.color-preview:hover {
	outline: inset white;
}

.color-input {
	display: block;
	flex: 1;
	width: 100%;
	color: var(--vscode-input-foreground);
	background-color: var(--vscode-input-background);
	border: none;
	padding: 0 0.6em;
}

.add-color-button {
	display: block;
	border: none;
	margin: 0 auto;
}
</file>

<file path="The-Creator-AI-main/public/reset.css">
html {
	box-sizing: border-box;
	font-size: 13px;
}

*,
*:before,
*:after {
	box-sizing: inherit;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ol,
ul {
	margin: 0;
	padding: 0;
	font-weight: normal;
}

img {
	max-width: 100%;
	height: auto;
}
</file>

<file path="The-Creator-AI-main/public/spiral.svg">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <g id="Page-1" stroke="none" fill="none" fill-rule="evenodd">
        <g id="dep" transform="translate(4, 6)">
            <path d="M100 100 
            m 0 -80 
            a 80 80 0 0 1 0 160 
            a 70 70 0 0 1 0 -140 
            a 60 60 0 0 1 0 120 
            a 50 50 0 0 1 0 -100 
            a 40 40 0 0 1 0 80 
            a 30 30 0 0 1 0 -60 
            a 20 20 0 0 1 0 40"
                fill="none" stroke="white" stroke-width="8"
                id="Shape" />
        </g>
    </g>
</svg>
</file>

<file path="The-Creator-AI-main/public/vscode.css">
:root {
	--container-paddding: 20px;
	--input-padding-vertical: 6px;
	--input-padding-horizontal: 4px;
	--input-margin-vertical: 4px;
	--input-margin-horizontal: 0;
}

body {
	padding: 0 var(--container-paddding);
	color: var(--vscode-foreground);
	font-size: var(--vscode-font-size);
	font-weight: var(--vscode-font-weight);
	font-family: var(--vscode-font-family);
	background-color: var(--vscode-editor-background);
}

ol,
ul {
	padding-left: var(--container-paddding);
}

body > *,
form > * {
	margin-block-start: var(--input-margin-vertical);
	margin-block-end: var(--input-margin-vertical);
}

*:focus {
	outline-color: var(--vscode-focusBorder) !important;
}

a {
	color: var(--vscode-textLink-foreground);
}

a:hover,
a:active {
	color: var(--vscode-textLink-activeForeground);
}

code {
	font-size: var(--vscode-editor-font-size);
	font-family: var(--vscode-editor-font-family);
}

button {
	border: none;
	padding: var(--input-padding-vertical) var(--input-padding-horizontal);
	width: 100%;
	text-align: center;
	outline: 1px solid transparent;
	outline-offset: 2px !important;
	color: var(--vscode-button-foreground);
	background: var(--vscode-button-background);
}

button:hover {
	cursor: pointer;
	background: var(--vscode-button-hoverBackground);
}

button:focus {
	outline-color: var(--vscode-focusBorder);
}

button.secondary {
	color: var(--vscode-button-secondaryForeground);
	background: var(--vscode-button-secondaryBackground);
}

button.secondary:hover {
	background: var(--vscode-button-secondaryHoverBackground);
}

input:not([type='checkbox']),
textarea {
	display: block;
	width: 100%;
	border: none;
	font-family: var(--vscode-font-family);
	padding: var(--input-padding-vertical) var(--input-padding-horizontal);
	color: var(--vscode-input-foreground);
	outline-color: var(--vscode-input-border);
	background-color: var(--vscode-input-background);
}

input::placeholder,
textarea::placeholder {
	color: var(--vscode-input-placeholderForeground);
}
</file>

<file path="The-Creator-AI-main/README.md">
# The Creator AI

This extension integrates a coding assistant directly into your VS Code environment.

<img width="350" alt="image" src="https://github.com/user-attachments/assets/ea18a853-4640-4b35-b291-f6c39ea35bb4" />
<img width="350" alt="image" src="https://github.com/user-attachments/assets/53cbe519-e8b9-4d7c-a101-151b316bf28f" />

## Features

* **Context chooser:** Choose files/folders through UI which are to be kept in the context.
* **Code Change Plan:** Describe code changes you'd like to plan, and the AI will generate a plan for implementation.

## Requirements

This extension requires an API key for either Gemini or OpenAI. You'll be prompted to enter your key when you first use the extension.


## Release Notes

### 0.0.1

Initial release of the Creator AI extension with basic chat, change plan, and file explorer functionalities.

## Following Extension Guidelines

This extension adheres to the VS Code extension guidelines and best practices.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can edit this README using Visual Studio Code. Some useful keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) for Markdown snippets.

## For More Information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!** 
</file>

<file path="The-Creator-AI-main/src/backend/commands/commands.ts">
import { ChangePlan } from "@/client/views/change-plan.view/store/change-plan-view.state-type";
import { remoteSetChangePlanViewState } from "@/backend/utils/remoteSetChangePlanViewState";
import { VIEW_TYPES } from "@/common/view-types";
import * as vscode from "vscode";
import { Services } from "@/backend/services/services";
import { serverIPCs } from "@/client/views";

// Define an array of commands with their corresponding callback functions
export const commands = [
  {
    commandId: "the-creator-ai.helloWorld",
    callback: () => {
      console.log("Hello World from the-creator-ai!");
      vscode.window.showInformationMessage(
        "Hello World from the-creator-ai!"
      );
    },
  },
  {
    commandId: "the-creator-ai.resetClearChangePlanViewState",
    callback: async () => {
      const persistentStoreRepository =
        Services.getPersistentStoreRepository();
      await persistentStoreRepository.clearChangePlanViewState();
    },
  },
  {
    commandId: "the-creator-ai.chooseChangePlan",
    callback: async () => {
      const persistentStoreRepository =
        Services.getPersistentStoreRepository();
      const store = persistentStoreRepository.getChangePlanViewState();
      const changePlans = store?.changePlans || [];

      // Sort change plans by last updated date (descending)
      changePlans.sort((a: ChangePlan, b: ChangePlan) => b.lastUpdatedAt - a.lastUpdatedAt);

      // Show quick pick with plan titles
      const selectedPlan = await vscode.window.showQuickPick(
        changePlans.map((plan: ChangePlan) => {
          return {
            label: plan.planTitle,
            description: new Date(plan.lastUpdatedAt).toLocaleString(),
            plan,
          };
        }),
        {
          placeHolder: "Select a plan to load or delete",
          matchOnDescription: true
        }
      );

      if (selectedPlan) {
        const choice = await vscode.window.showQuickPick(
          ['Load', 'Delete'],
          {
            placeHolder: `What do you want to do with: ${selectedPlan.label} plan?`
          }
        )
        if (choice === 'Load') {
          const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CHANGE_PLAN];
          remoteSetChangePlanViewState(
            serverIpc,
            "changeDescription",
            selectedPlan.plan.planDescription
          );
          remoteSetChangePlanViewState(
            serverIpc,
            "llmResponse",
            selectedPlan.plan.llmResponse
          );
          remoteSetChangePlanViewState(
            serverIpc,
            "selectedFiles",
            selectedPlan.plan.selectedFiles
          );
          remoteSetChangePlanViewState(
            serverIpc,
            "chatHistory",
            selectedPlan.plan.chatHistory
          );
          remoteSetChangePlanViewState(
            serverIpc,
            "changePlans",
            changePlans
          );
        } else if(choice === 'Delete') {
          const confirmDelete = await vscode.window.showWarningMessage(
            `Are you sure you want to delete the plan "${selectedPlan.label}"?`,
            { modal: true },
            'Yes', 'No'
          );

          if (confirmDelete === 'Yes') {
            const updatedChangePlans = changePlans.filter((plan: ChangePlan) => plan.planTitle !== selectedPlan.label);
            persistentStoreRepository.setChangePlanViewState({
              ...store,
              changePlans: updatedChangePlans,
            });
          }
        }
      }
    },
  },
  {
    commandId: "the-creator-ai.newPlan",
    callback: async () => {
      const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CHANGE_PLAN];
      remoteSetChangePlanViewState(serverIpc, "changeDescription", "");
      remoteSetChangePlanViewState(serverIpc, "llmResponse", "");
      remoteSetChangePlanViewState(serverIpc, "chatHistory", []);
      remoteSetChangePlanViewState(serverIpc, "fileChunkMap", {});
      remoteSetChangePlanViewState(serverIpc, "isLoading", false);
    },
  },
  {
    commandId: "the-creator-ai.clearHistory",
    callback: async () => {
      const persistentStoreRepository =
        Services.getPersistentStoreRepository();
      await persistentStoreRepository.clearChangePlanViewState();
    },
  },
  {
    commandId: "the-creator-ai.exportChangePlan",
    callback: async () => {
      const planExImService = Services.getPlanExImService();
      await planExImService.exportAllChangePlans();
    },
  },
  {
    commandId: "the-creator-ai.importChangePlan",
    callback: async () => {
       const planExImService = Services.getPlanExImService();
      await planExImService.importAllChangePlans();
    },
  },
];
</file>

<file path="The-Creator-AI-main/src/backend/commands/register-commands.ts">
import * as vscode from "vscode";
import { commands } from "./commands";

export function registerCommands(context: vscode.ExtensionContext) {
  // Iterate over the commands array to register each command
  commands.forEach(({ commandId, callback }) => {
    let disposable = vscode.commands.registerCommand(commandId, callback);
    context.subscriptions.push(disposable);
  });
}
</file>

<file path="The-Creator-AI-main/src/backend/repositories/chat.respository.ts">
import { randomUUID } from "crypto";
import { getContext } from "../../extension";
import { StorageKeysEnum } from "../types/storage-keys.enum";

export interface ChatMessage {
  user: 'user' | 'bot' | 'instrutor'
  message: string;
}

export interface Chat {
  id: string;
  messages: ChatMessage[];
}

interface ChatRepositoryData {
  chats: Chat[];
  activeChatId: string | null;
}

const defaultChatRepositoryData: ChatRepositoryData = {
  chats: [],
  activeChatId: null,
};

export class ChatRepository {
  private static async getChatRepositoryData(): Promise<ChatRepositoryData> {
    const chatRepositoryData =
      getContext().workspaceState.get<ChatRepositoryData>(
        StorageKeysEnum.ChatRepository
      );
    if (!chatRepositoryData || !chatRepositoryData.chats) {
      await getContext().workspaceState.update(
        StorageKeysEnum.ChatRepository,
        defaultChatRepositoryData
      );
      return defaultChatRepositoryData;
    }
    return chatRepositoryData;
  }

  private static async patchChatRepositoryData(
    chatRepositoryData: Partial<ChatRepositoryData>
  ): Promise<void> {
    const existingData = await this.getChatRepositoryData();
    const updatedData = {
      ...existingData,
      ...chatRepositoryData,
    };
    await getContext().workspaceState.update(
        StorageKeysEnum.ChatRepository,
      updatedData
    );
  }

  static async getChats(): Promise<Chat[]> {
    return (await this.getChatRepositoryData()).chats;
  }

  static async getChatById(id?: string): Promise<Chat | undefined> {
    if (!id) {
      return this.getActiveChat();
    }
    const chats = await this.getChats();
    return chats.find((chat) => chat.id === id);
  }

  static async createChat(): Promise<Chat> {
    const newChat: Chat = { id: randomUUID(), messages: [] };
    const chats = await this.getChats();
    chats.push(newChat);
    await this.patchChatRepositoryData({ chats });
    await this.setActiveChat(newChat.id);
    return newChat;
  }

  static async updateChat(updatedChat: Chat): Promise<void> {
    const chats = await this.getChats();
    const index = chats.findIndex((chat) => chat.id === updatedChat.id);
    if (index !== -1) {
      chats[index] = updatedChat;
      await this.patchChatRepositoryData({ chats });
    }
  }

  static async deleteChat(id: string): Promise<void> {
    const chats = await this.getChats();
    const updatedChats = chats.filter((chat) => chat.id !== id);
    await this.patchChatRepositoryData({ chats: updatedChats });
  }

  static async getActiveChat() {
    const activeChatId = (await this.getChatRepositoryData()).activeChatId;
    if (!activeChatId) {
      return await this.createChat();
    }
    const activeChat = await this.getChatById(activeChatId);
    if (!activeChat) {
      return await this.createChat();
    }
    return activeChat;
  }

  static async setActiveChat(chatId: string | null): Promise<void> {
    await this.patchChatRepositoryData({ activeChatId: chatId });
  }

  // Message Management within a Chat
  static async addMessageToChat(
    chatId: string,
    message: ChatMessage
  ): Promise<void> {
    const chat = await this.getChatById(chatId);
    if (chat) {
      chat.messages.push(message);
      await this.updateChat(chat);
    }
  }

  static async updateMessageInChat(
    chatId: string,
    messageIndex: number,
    updatedMessage: ChatMessage
  ): Promise<void> {
    const chat = await this.getChatById(chatId);
    if (chat && chat.messages[messageIndex]) {
      chat.messages[messageIndex] = updatedMessage;
      await this.updateChat(chat);
    }
  }

  static async deleteMessageFromChat(
    chatId: string,
    messageIndex: number
  ): Promise<void> {
    const chat = await this.getChatById(chatId);
    if (chat && chat.messages[messageIndex]) {
      chat.messages.splice(messageIndex, 1);
      await this.updateChat(chat);
    }
  }
}
</file>

<file path="The-Creator-AI-main/src/backend/repositories/persistent-store.repository.ts">
import * as vscode from "vscode";
import { StorageKeysEnum } from "../types/storage-keys.enum";
import { getContext } from "../../extension";
import {ChangePlanViewStore} from '@/client/views/change-plan.view/store/change-plan-view.state-type';

export class PersistentStoreRepository {
  private readonly workspaceState: vscode.Memento;

  constructor() {
    this.workspaceState = getContext().workspaceState;
  }

  public getChangePlanViewState(): ChangePlanViewStore | undefined {
    const data = this.workspaceState.get<ChangePlanViewStore>(
      StorageKeysEnum.ChangePlanViewState
    );
    return data;
  }

  public setChangePlanViewState(data: ChangePlanViewStore): void {
    this.workspaceState.update(StorageKeysEnum.ChangePlanViewState, data);
  }

  public clearChangePlanViewState(): void {
    this.workspaceState.update(StorageKeysEnum.ChangePlanViewState, undefined);
  }
}
</file>

<file path="The-Creator-AI-main/src/backend/repositories/settings.repository.ts">
import { Injectable } from "injection-js";
import { getContext } from "../../extension";
import { LlmServiceEnum } from "../types/llm-service.enum";
import { StorageKeysEnum } from "../types/storage-keys.enum";

@Injectable()
export class SettingsRepository {
  async getLLMApiKeys(): Promise<Record<LlmServiceEnum, string[]> | undefined> {
    try {
      const llmApiKeys = getContext().workspaceState.get<string>(
        StorageKeysEnum.LlmApiKeys
      );

      return llmApiKeys ? JSON.parse(llmApiKeys) : {};
    } catch (error) {
      console.error("Error retrieving LLM API keys:", error);
      return undefined;
    }
  }

  async setLLMApiKey(service: LlmServiceEnum, apiKey: string): Promise<void> {
    const llmApiKeys = (await this.getLLMApiKeys()) || {};
    llmApiKeys[service]
      ? llmApiKeys[service].push(apiKey)
      : (llmApiKeys[service] = [apiKey]);

    try {
      getContext().workspaceState.update(
        StorageKeysEnum.LlmApiKeys,
        JSON.stringify(llmApiKeys)
      );
    }
    catch (error) {
      console.error("Error setting LLM API key:", error);
      throw error;
    }
  }

  async deleteLLMApiKey(
    service: LlmServiceEnum,
    apiKeyToDelete: string
  ): Promise<void> {
    const llmApiKeys = (await this.getLLMApiKeys()) || {};
    llmApiKeys[service]
      ? (llmApiKeys[service] = llmApiKeys[service].filter(
          (apiKey) => apiKey !== apiKeyToDelete
        ))
      : null;

    try {
      getContext().workspaceState.update(
        StorageKeysEnum.LlmApiKeys,
        JSON.stringify(llmApiKeys)
      );
    }
    catch (error) {
      console.error("Error deleting LLM API key:", error);
      throw error;
    }
  }
}
</file>

<file path="The-Creator-AI-main/src/backend/services/code.service.ts">
import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { Injectable } from "injection-js";
import { Services } from "./services";
import { AGENTS } from "@/common/constants/agents.constants";

@Injectable()
export class CodeService {
  public findFilePaths(paths: string[]): string[] {
    return paths.map(this.findFilePath.bind(this)); // Bind to the service instance
  }

  public findFilePath(filePath: string): string {
    if (fs.existsSync(filePath)) {
      return filePath;
    }

    const parts = filePath.split(path.sep);
    let currentPath = parts[0];

    // Traverse the path from the top to find the deepest valid directory
    for (let i = 1; i < parts.length; i++) {
      currentPath = path.join(currentPath, parts[i]);
      if (!fs.existsSync(currentPath)) {
        currentPath = path.dirname(currentPath);
        break;
      }
    }

    const fileName = parts[parts.length - 1];
    let dirToSearch = currentPath;
    let foundFiles = this.findFilesInDirectory(dirToSearch, fileName);

    while (!foundFiles?.length) {
      dirToSearch = path.dirname(dirToSearch);
      if (dirToSearch === ".") break;
      foundFiles = this.findFilesInDirectory(dirToSearch, fileName);
    }

    if (foundFiles.length === 1) {
      return foundFiles[0];
    } else if (foundFiles.length > 1) {
      const parentDir = parts[parts.length - 2];
      for (const file of foundFiles) {
        if (path.basename(path.dirname(file)) === parentDir) {
          return file;
        }
      }
    }

    console.error(`File not found: ${filePath}`);
    console.log(`Creating file: ${filePath}`);

    fs.writeFileSync(filePath, "", "utf-8");
    return filePath;
  }

  /**
   * Recursively searches for files with a given name in a directory and its subdirectories.
   * @param dir The directory to search in.
   * @param fileName The name of the file to search for.
   * @returns An array of file paths that match the file name.
   */
  private findFilesInDirectory(dir: string, fileName: string): string[] {
    try {
      const stat = fs.statSync(dir);
      if (!stat.isDirectory()) return [];
    } catch (err) {
      return [];
    }

    const files: string[] = [];
    try {
      const items = fs.readdirSync(dir);

      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isFile() && path.basename(fullPath) === fileName) {
          files.push(fullPath);
        } else if (stat.isDirectory()) {
          files.push(...this.findFilesInDirectory(fullPath, fileName)); // Use this.findFilesInDirectory
        }
      }
    } catch (err) {
      console.error(`Error reading directory ${dir}:`, err);
    }

    return files;
  }

  getDiff(diffText: string) {
    const diffLines = diffText.split("\n");

    let fileToChange: string | undefined = undefined;
    let originalCode: string | undefined = undefined;
    let modifiedCode: string | undefined = undefined;
    let inSearchBlock = false;
    let inReplaceBlock = false;
    let inFilePathBlock = false;

    const changes = [];

    for (const line of diffLines) {
      if (line.startsWith("\`\`\`diff")) {
        if (fileToChange && originalCode && modifiedCode) {
          changes.push({ fileToChange, originalCode, modifiedCode });
        }
        fileToChange = undefined;
        originalCode = undefined;
        modifiedCode = undefined;
        inFilePathBlock = true;
        continue;
      }

      if (inFilePathBlock) {
        fileToChange = line.trim();
        inFilePathBlock = false;
        continue;
      }

      if (line.startsWith("<<<<<<< SEARCH")) {
        inSearchBlock = true;
        inReplaceBlock = false;
        continue;
      }

      if (line.startsWith("=======")) {
        inSearchBlock = false;
        inReplaceBlock = true;
        continue;
      }

      if (line.startsWith(">>>>>>>")) {
        if (fileToChange && originalCode && modifiedCode) {
          changes.push({ fileToChange, originalCode, modifiedCode });
        }
        fileToChange = undefined;
        originalCode = undefined;
        modifiedCode = undefined;
        inSearchBlock = false;
        inReplaceBlock = false;
        continue;
      }

      if (inSearchBlock && originalCode !== undefined) {
        originalCode += line + "\n";
      } else if (inSearchBlock) {
        originalCode = line + "\n";
      } else if (inReplaceBlock && modifiedCode !== undefined) {
        modifiedCode += line + "\n";
      } else if (inReplaceBlock) {
        modifiedCode = line + "\n";
      }
    }

    // Push the last block if it exists
    if (fileToChange && originalCode && modifiedCode) {
      changes.push({ fileToChange, originalCode, modifiedCode });
    }

    return changes;
  }

  public async applyDiffs(
    diffText: string,
    trySmartApply: (
      filePath: string,
      originalCode: string,
      modifiedCode: string
    ) => void
  ): Promise<void> {
    const blocks = this.getDiff(diffText);
    console.log({ diffText, blocks });

    for await (const block of blocks) {
      const { fileToChange, originalCode, modifiedCode } = block;

      const currentFilePath = this.findFilePath(fileToChange); // Use injected service

      const resCode = await this.applyChangesToFile(
        currentFilePath,
        originalCode,
        modifiedCode
      );

      if (resCode) {
        trySmartApply(currentFilePath, originalCode, modifiedCode);
      }
    }
  }

  private escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  private async applyChangesToFile(
    filePath: string,
    originalCode: string,
    modifiedCode: string
  ): Promise<boolean> {
    console.log({ filePath, originalCode, modifiedCode });

    try {
      const fileContent = await fs.promises.readFile(filePath, "utf8");
      if (!originalCode ) {
        await fs.promises.writeFile(filePath, modifiedCode, "utf8");
      }

      const whitespaceFlexibleOriginalCode = this.escapeRegExp(originalCode)
        .split("\n")
        .map((line) => line.trim().replace(/\s+/g, "\\s+"))
        .join("\\s*");

      const regex = new RegExp(whitespaceFlexibleOriginalCode, "g");
      console.log({ whitespaceFlexibleOriginalCode });

      const updatedContent = fileContent.replace(regex, modifiedCode);

      await fs.promises.writeFile(filePath, updatedContent, "utf8");
      console.log(`Applied changes to ${filePath}`);

      return fileContent === updatedContent;
    } catch (error) {
      console.error(`Error applying changes to ${filePath}:`, error);
      return false; // Indicate failure
    }
  }

  private getFileContent(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const data = fs.readFileSync(filePath, "utf-8");
        resolve(data);
      } catch (error) {
        console.error("Error reading file:", error);
        reject("Error reading file");
      }
    });
  }

  private async writeFileContent(
    filePath: string,
    content: string
  ): Promise<void> {
    const fileUri = vscode.Uri.file(filePath);
    const encoder = new TextEncoder();
    await vscode.workspace.fs.writeFile(fileUri, encoder.encode(content));
  }

  private async openFileAndShowDiff(filePath: string): Promise<void> {
    const fileUri = vscode.Uri.file(filePath);
    const document = await vscode.workspace.openTextDocument(fileUri);
    await vscode.window.showTextDocument(document);
    await vscode.commands.executeCommand("git.openChange", fileUri);
  }

  private extractCodeFromResponse(response: string): string {
    const codeBlockRegex = /```[\w]*\n([\s\S]*?)\n```/;
    const match = response.match(codeBlockRegex);
    return match ? match[1] : response;
  }

  private extractDiffFromResponse(response: string): string {
    const diffBlockRegex = /```diff\n([\s\S]*?)\n```/;
    console.log(response);
    const match = response.match(diffBlockRegex);
    return match ? match[1] : response;
  }

  private createPromptForLLM(filePath: string, fileContent: string): string {
    return `Based on the plan above and previous conversation, please give the updated code for the file: ${filePath}.
      Also please make sure to give full file code in the response.
      `;
  }

  async requestFileCode(
    filePath: string,
    chatHistory: any[],
    selectedFiles: string[],
    onChunk?: (path: string, chunk: string) => void
  ) {
    ``;
    const fsService = Services.getFSService();
    const absoluteFilePath = await fsService.resolveFilePath(filePath);
    if (!absoluteFilePath) {
      throw new Error(`Could not resolve file path: ${filePath}`);
    }

    try {
      // Check if the file exists
      if (!fs.existsSync(absoluteFilePath)) {
        // If the file doesn't exist, create it
        if (path.isAbsolute(absoluteFilePath)) {
          // If the path is absolute, create it at that path
          fs.writeFileSync(absoluteFilePath, "");
        } else {
          // If the path is relative, create it relative to the workspace directory
          const workspacePath =
            vscode.workspace.workspaceFolders![0].uri.fsPath;
          const fullFilePath = path.join(workspacePath, absoluteFilePath);
          fs.writeFileSync(fullFilePath, "");
        }
      }

      const fileContentString = await this.getFileContent(absoluteFilePath);
      const finalMessage = this.createPromptForLLM(
        absoluteFilePath,
        fileContentString
      );
      const response = await Services.getLlmService().sendPrompt(
        [
          ...chatHistory,
          {
            user: "instructor",
            message: AGENTS.Developer_diff.systemInstructions,
          },
          { user: "user", message: finalMessage },
        ],
        selectedFiles,
        (chunk: string) => {
          if (onChunk) {
            onChunk(absoluteFilePath, chunk);
          }
        }
      );

      const updatedCode = await this.applyDiffs(response.response, () => {});

      // TODO: Instead of showing the diff after making change, we can show it before and ask user to apply the changes
      //   await this.openFileAndShowDiff(absoluteFilePath);
      return {
        filePath: absoluteFilePath,
        fileContent: response.response,
      };
    } catch (error) {
      console.error(`Error processing file: ${error}`);
      throw error;
    }
  }
}
</file>

<file path="The-Creator-AI-main/src/backend/services/fs.service.ts">
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { Injectable } from "injection-js";
import { ServerToClientChannel } from "@/common/ipc/channels.enum";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { FileNode } from "@/common/types/file-node";
import { Services } from "@/backend/services/services";

@Injectable()
export class FSService {
  createFileTree(
    workspaceRoots: vscode.Uri[],
    files: vscode.Uri[],
    fromSystemRoot = false
  ): FileNode[] {
    const rootNodes: FileNode[] = workspaceRoots.map((root) => {
      if (!fromSystemRoot) {
        return {
          name: root.path.split("/").pop() || "",
          children: [],
          absolutePath: root.fsPath,
        };
      }
      const parts = root.path.split("/").filter(Boolean);
      let currentNode: FileNode = {
        name: parts[0],
        children: [],
        absolutePath: "/" + parts[0],
      };
      let rootNode = currentNode;

      for (let i = 1; i < parts.length; i++) {
        const newNode: FileNode = {
          name: parts[i],
          children: [],
          absolutePath: path.join(currentNode.absolutePath, parts[i]),
        };
        currentNode.children!.push(newNode);
        currentNode = newNode;
      }

      return rootNode;
    });
    const leafNodes = rootNodes.map((root) => {
      let currentNode = root;
      while (currentNode.children && currentNode.children.length > 0) {
        currentNode = currentNode.children[currentNode.children.length - 1];
      }
      return currentNode;
    });

    const workspaceRootPaths = workspaceRoots.map((root) => root.fsPath);

    for (const file of files) {
      const workspaceRootIndex = workspaceRootPaths.findIndex((rootPath) =>
        file.fsPath.startsWith(rootPath)
      );

      if (workspaceRootIndex !== -1) {
        const relativePath = path.relative(
          workspaceRootPaths[workspaceRootIndex],
          file.fsPath
        );
        const parts = relativePath.split(path.sep).filter(Boolean);

        let currentNode = leafNodes[workspaceRootIndex];

        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];
          let child = currentNode.children?.find((c) => c.name === part);

          if (!child) {
            child = {
              name: part,
              absolutePath: path.join(currentNode.absolutePath, part),
            };
            if (i < parts.length - 1) {
              child.children = [];
            }
            currentNode.children = currentNode.children || [];
            currentNode.children.push(child);
          }

          currentNode = child;
        }
      }
    }

    return rootNodes;
  }

  readFileContent(filePath: string): string {
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      return data;
    } catch (error) {
      console.error("Error reading file:", error);
      return "Error reading file";
    }
  }

  readSelectedFilesContent(filePaths: string[]): {
    [filePath: string]: string;
  } {
    const fileContents: { [filePath: string]: string } = {};
    const processedPaths = new Set<string>();

    const readContentRecursive = (filePath: string) => {
      if (processedPaths.has(filePath)) {
        return;
      }
      processedPaths.add(filePath);

      try {
        if (fs.statSync(filePath).isDirectory()) {
          fs.readdirSync(filePath).forEach((file) =>
            readContentRecursive(path.join(filePath, file))
          );
        } else {
          try {
            fileContents[filePath] = fs.readFileSync(filePath, "utf8");
          } catch (error) {
            console.error(`Error reading file ${filePath}: ${error}`);
          }
        }
      } catch (error) {
        console.error(`Error reading file ${filePath}: ${error}`);
      }
    };

    filePaths.forEach((filePath) => readContentRecursive(filePath));

    return fileContents;
  }

  async resolveFilePath(originalFilePath: string): Promise<string | null> {
    async function findFile(filePath: string): Promise<string | null> {
      const files = await vscode.workspace.findFiles(
        `**/${filePath}`,
        null,
        10
      );

      if (files.length === 1) {
        return files[0].fsPath;
      } else if (files.length > 1) {
        const selectedFile = await vscode.window.showQuickPick(
          files.map((file) => file.fsPath),
          {
            placeHolder: "Multiple files found. Please select the correct one.",
          }
        );
        return selectedFile || null;
      } else {
        const pathParts = filePath.split("/");
        if (pathParts.length > 1) {
          // Drop the first part of the path and try again
          const remainingPath = pathParts.slice(1).join("/");
          return findFile(remainingPath);
        }
        return null;
      }
    }

    const resolvedPath = await findFile(originalFilePath);

    if (resolvedPath) {
      return resolvedPath;
    } else {
      // File not found, ask the user to confirm or modify the path for creating an empty file
      // TODO: What if there are multiple workspace folders?
      const workspacePath = vscode.workspace.workspaceFolders![0].uri.fsPath;
      let newFilePath = await vscode.window.showInputBox({
        prompt:
          "The file is not found. Please confirm or modify the file path to create an empty file.",
        value: originalFilePath,
      });
      const isAbsolute = path.isAbsolute(newFilePath);
      newFilePath = isAbsolute
        ? newFilePath
        : path.join(workspacePath, newFilePath);

      if (newFilePath) {
        const dirPath = path.dirname(newFilePath);

        // Create directory if it doesn't exist
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }

        console.log("Creating new file at", newFilePath);

        // Create empty file
        fs.writeFileSync(newFilePath, "");
        vscode.window.showTextDocument(vscode.Uri.file(newFilePath));
        return newFilePath;
      }
      return null;
    }
  }

  async handleFileOpen(data: { filePath: string }) {
    const { filePath } = data;

    const absoluteFilePath = await this.resolveFilePath(filePath);
    if (!absoluteFilePath) {
      return; // Error message already shown in resolveFilePath
    }

    try {
      // Check if the file exists
      if (!fs.existsSync(absoluteFilePath)) {
        // If the file doesn't exist, create it
        if (path.isAbsolute(absoluteFilePath)) {
          // If the path is absolute, create it at that path
          fs.writeFileSync(absoluteFilePath, "");
        } else {
          // If the path is relative, create it relative to the workspace directory
          const workspacePath =
            vscode.workspace.workspaceFolders![0].uri.fsPath;
          const fullFilePath = path.join(workspacePath, absoluteFilePath);
          fs.writeFileSync(fullFilePath, "");
        }
      }

      await vscode.window.showTextDocument(vscode.Uri.file(absoluteFilePath), {
        preview: false,
      });
    } catch (error) {
      vscode.window.showErrorMessage(`Error opening file: ${error}`);
    }
  }

  setupFileSystemWatcher(serverIpc: any) {
    let fileSystemWatcher: vscode.FileSystemWatcher | undefined;
    if (fileSystemWatcher) {
      fileSystemWatcher.dispose();
    }

    fileSystemWatcher = vscode.workspace.createFileSystemWatcher("**/*");

    fileSystemWatcher.onDidCreate(() => this.sendWorkspaceFiles(serverIpc));
    fileSystemWatcher.onDidDelete(() => this.sendWorkspaceFiles(serverIpc));
    fileSystemWatcher.onDidChange(() => this.sendWorkspaceFiles(serverIpc));
  }

  async handleWorkspaceFilesRequest(serverIpc: ServerPostMessageManager) {
    await this.sendWorkspaceFiles(serverIpc);

    // Set up file system watcher if not already set
    this.setupFileSystemWatcher(serverIpc);
  }

  async sendWorkspaceFiles(serverIpc: ServerPostMessageManager) {
    const workspaceRoots =
      vscode.workspace.workspaceFolders?.map((folder) => folder.uri) || [];
    const fsService = Services.getFSService();
    const files = await fsService.getFilesRespectingGitignore();
    const workspaceFileTree = fsService.createFileTree(workspaceRoots, files);

    serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, {
      files: workspaceFileTree,
    });
  }

  async getFilesRespectingGitignore(): Promise<vscode.Uri[]> {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
      return [];
    }

    const gitignores = await this.findGitignores(workspaceFolder.uri);
    const allFiles = await vscode.workspace.findFiles("**/*");

    return allFiles.filter((file) => !this.isIgnored(file.fsPath, gitignores));
  }

  async findGitignores(workspaceUri: vscode.Uri): Promise<any[]> {
    const gitignoreFiles = await vscode.workspace.findFiles("**/.gitignore");
    const gitignores: any[] = [];

    for (const gitignoreUri of gitignoreFiles) {
      const content = await vscode.workspace.fs.readFile(gitignoreUri);
      gitignores.push({
        path: path.dirname(gitignoreUri.fsPath),
        ig: this.ignore().add(content.toString()),
      });
    }

    return gitignores;
  }

  ignore(): any {
    return {
      add: (content: string) => {
        const ignored = (filePath: string) => {
          return content
            .split("\n")
            .filter(Boolean)
            .some((line) => filePath.includes(line));
        };

        return {
          ignores: ignored,
        };
      },
    };
  }

  isIgnored(filePath: string, gitignores: any[]): boolean {
    for (const { path: gitignorePath, ig } of gitignores) {
      if (filePath.startsWith(gitignorePath)) {
        const relativePath = path.relative(gitignorePath, filePath);
        if (ig.ignores(relativePath)) {
          return true;
        }
      }
    }
    return false;
  }
}
</file>

<file path="The-Creator-AI-main/src/backend/services/git.service.ts">
import * as child_process from "child_process";
import * as vscode from "vscode";
import { Injectable } from "injection-js";

@Injectable()
export class GitService {
    /**
     * Commits changes to the Git repository with the provided message.
     *
     * @param commitMessage - The commit message to use.
     * @param commitDescription - (Optional) A commit description to include.
     * @returns The Git commit output as a string, or an empty string if an error occurs.
     */
    gitCommit = (
        commitMessage: string,
        commitDescription?: string
    ): string => {
        try {
            // 1. Construct the commit command
            let commitCommand = `git commit -m "${commitMessage}"`;

            // 2. (Optional) Include description if provided
            if (commitDescription?.trim()) {
                commitCommand += ` -m "${commitDescription}"`;
            }

            // 3. Execute the commit command
            // current working directory
            const commitOutput = child_process.execSync(commitCommand, {
                cwd: vscode.workspace.rootPath,
            });

            // 4. Handle the commit result
            console.log("Commit successful:", commitOutput.toString());
            return commitOutput.toString();
        } catch (error) {
            console.error("Error during commit:", error);
            return "";
        }
    };
}
</file>

<file path="The-Creator-AI-main/src/backend/services/llm.service.ts">
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import * as openai from "openai";
import * as vscode from "vscode";
import { ChatMessage } from "../repositories/chat.respository";
import { Inject, Injectable } from "injection-js";
import { SettingsRepository } from "../repositories/settings.repository";
import { LlmServiceEnum } from "../types/llm-service.enum";
import { PersistentStoreRepository } from "../repositories/persistent-store.repository";
import { ChangePlan } from "@/client/views/change-plan.view/store/change-plan-view.state-type";
import { StorageKeysEnum } from "../types/storage-keys.enum";
import { FSService } from "./fs.service";

@Injectable()
export class LlmService {
  private geminiProModel: string = "gemini-1.5-pro-exp-0827";
  private geminiFlashModel: string = "gemini-1.5-flash-latest";
  private geminiFlash2Model: string = "models/gemini-2.0-flash-exp";
  private openaiModel: string = "gpt-3.5-turbo";
  private currentModel: string = this.geminiFlash2Model; 

  constructor(
    @Inject(FSService) private readonly fsService: FSService,
    @Inject(SettingsRepository)
    private readonly settingsRepository: SettingsRepository,
    @Inject(PersistentStoreRepository)
    private readonly persistentStoreRepository: PersistentStoreRepository
  ) {}

  async sendPrompt(
    chatHistory: ChatMessage[],
    selectedFiles: string[] = [],
    onChunk?: (chunk: string, modelType: string, modelName: string) => void
  ): Promise<{ response: string; modelType: string; modelName: string }> {
    const { type, apiKeys } = await this.getApiKey();
    console.log({ type, apiKeys, chatHistory, selectedFiles });

    // Fetch past change plans
    const pastChangePlans = await this.getPastChangePlans();

    // Read selected files content
    const fileContents =
      this.fsService.readSelectedFilesContent(selectedFiles);

    // Append file contents to prompt
    let prompt = "";
    for (const filePath in fileContents) {
      prompt += `\n\n\`\`\`
File: ${filePath}
${fileContents[filePath]}
\`\`\`\n\n`;
    }

    // Append past change plans to prompt
    if (pastChangePlans?.length) {
      prompt += `\n\nPast Change Plans:\n\`\`\`json\n${JSON.stringify(
        pastChangePlans.map(({ planTitle, planDescription, planJson }) => ({ planTitle, planDescription, planJson })),
        null,
        2
      )}\n\`\`\`\n\n`;
    }

    chatHistory.forEach((message) => {
      prompt += `${message.user}: ${message.message}\n`;
    });

    console.log(`Prompt:\n\n\n`);
    console.log(prompt);

    if (type === "gemini") {
      return this.sendPromptToGemini(prompt, apiKeys, onChunk);
    } else if (type === "openai") {
      return this.sendPromptToOpenAI(prompt, apiKeys[0], onChunk); // Assuming only one OpenAI key is stored
    } else {
      throw new Error(
        "No API key found. Please set either GEMINI_API_KEY or OPENAI_API_KEY environment variable."
      );
    }
  }

  private async sendPromptToGemini(
    prompt: string,
    apiKeys: string[],
    onChunk?: (chunk: string, modelType: string, modelName: string) => void
  ): Promise<{ response: string; modelType: string; modelName: string }> {
    let debounce = 0;
    let attempts = 0;
    let responseText = "";
    let currentKeyIndex = 0; // Track the current key being used

    while (attempts < 3) {
      attempts++;
      if (debounce > 0) {
        console.log(`Waiting for ${Math.floor(debounce / 1000)} seconds...`);
      }
      console.log(`Using model: ${this.currentModel}`);
      await new Promise((resolve) => setTimeout(resolve, debounce));
      try {
        const genAI = new GoogleGenerativeAI(apiKeys[currentKeyIndex]);
        const gemini = genAI.getGenerativeModel({
          model: this.currentModel,
        }); // Use currentModel here
        const response = await gemini.generateContentStream({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            responseMimeType: "text/plain",
          },
          safetySettings: [
            {
              category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
              threshold: HarmBlockThreshold.BLOCK_NONE,
            },
          ],
        });

        for await (const chunk of response.stream) {
          responseText += chunk.text();
          // console.log(chunk.text());
          if (onChunk) {
            onChunk(chunk.text(), "gemini", this.currentModel);
          }
        }
        debounce = 0;
        return {
          response: responseText,
          modelType: "gemini",
          modelName: this.currentModel,
        };
      } catch (e: any) {
        debounce += 5000;
        // Handle specific errors based on error type and status
        if (e.status === 429) {
          if (currentKeyIndex < apiKeys.length - 1) {
            // Pro model rate limit reached, try with the next key
            currentKeyIndex++;
            console.log(
              `${this.currentModel} limit reached for key ${
                apiKeys[currentKeyIndex - 1]
              }, trying with key ${apiKeys[currentKeyIndex]} `
            );
            continue; // Retry with the next key
          }
        } else {
          // For other errors, log the error and potentially throw or handle differently
          console.error(`Error during LLM request (attempt ${attempts}):`, e);
          // You might want to throw the error here or handle it differently based on your needs
          // throw new Error("Could not get a response from Gemini after multiple attempts.");
        }
      }
    }
    // If all attempts fail, throw an error
    throw new Error(
      "Could not get a response from Gemini after multiple attempts."
    );
  }

  getModelName(): string {
    return this.currentModel;
  }

  private async sendPromptToOpenAI(
    prompt: string,
    apiKey: string,
    onChunk?: (chunk: string, modelType: string, modelName: string) => void
  ): Promise<{ response: string; modelType: string; modelName: string }> {
    const model = new openai.OpenAI({ apiKey });

    this.currentModel = this.openaiModel;
    const response = await model.completions.create({
      model: this.openaiModel,
      prompt: prompt,
      stream: true,
    });

    let responseText = "";
    for await (const part of response) {
      const chunk = part.choices[0]?.text || "";
      responseText += chunk;
      if (onChunk) {
        onChunk(chunk, "openai", this.openaiModel);
      }
    }

    return {
      response: responseText,
      modelType: "openai",
      modelName: this.openaiModel,
    };
  }

  private async getApiKey(): Promise<any> {
    const apiKeys = await this.settingsRepository.getLLMApiKeys();
    if (!apiKeys) {
      throw new Error("API Keys not found!");
    }

    const type = Object.keys(apiKeys)[0] as LlmServiceEnum;

    if (type && Array.isArray(apiKeys[type])) {
      return { type, apiKeys: apiKeys[type] };
    } else {
      await this.getApiKeyFromUser();
      return await this.getApiKey();
    }
  }

  private async getPastChangePlans(): Promise<ChangePlan[] | undefined> {
    try {
      return this.persistentStoreRepository.getChangePlanViewState()
        ?.changePlans;
    } catch (error) {
      console.error("Error retrieving past change plans:", error);
      return undefined;
    }
  }

  private async setLLMApiKey(
    service: LlmServiceEnum,
    apiKey: string
  ): Promise<void> {
    await this.settingsRepository.setLLMApiKey(service, apiKey);
  }

  private async deleteLLMApiKey(
    service: LlmServiceEnum,
    apiKeyToDelete: string
  ): Promise<void> {
    await this.settingsRepository.deleteLLMApiKey(service, apiKeyToDelete);
  }

  private async getApiKeyFromUser(): Promise<any> {
    const apiChoice = await vscode.window.showQuickPick(
      [
        { label: "Gemini API Key", value: "gemini" },
        { label: "OpenAI API Key", value: "openai" },
      ],
      { placeHolder: "Select the API you want to use" }
    );

    if (apiChoice) {
      const apiKeyInput = await vscode.window.showInputBox({
        prompt: `Enter your ${apiChoice.label}`,
        placeHolder:
          apiChoice.value === "gemini"
            ? "Enter Gemini API Key"
            : "Enter OpenAI API Key",
        password: true, // Mask the input for security
      });
      console.log({ apiKeyInput, apiChoice });
      if (apiKeyInput) {
        await this.setLLMApiKey(apiChoice.value as LlmServiceEnum, apiKeyInput);
      }
    }
  }
}
</file>

<file path="The-Creator-AI-main/src/backend/services/logger.service.ts">
import * as fs from "fs";
import * as path from "path";
import { Injectable } from "injection-js";

@Injectable()
export class LoggerService {
  private logFilePath: string;

  constructor() {
    // Default log file path, you might want to make this configurable
    this.logFilePath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "logs",
      "extension.log"
    );
    // Ensure the logs directory exists
    const logDir = path.dirname(this.logFilePath);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  private _log(level: string, message: string, ...args: any[]): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message} ${
      args.length > 0 ? JSON.stringify(args) : ""
    }\n`;

    fs.appendFile(this.logFilePath, logMessage, (err) => {
      if (err) {
        console.error("Failed to write to log file:", err);
      }
    });
  }

  log(message: string, ...args: any[]): void {
    this._log("log", message, ...args);
  }

  info(message: string, ...args: any[]): void {
    this._log("info", message, ...args);
  }

  warn(message: string, ...args: any[]): void {
    this._log("warn", message, ...args);
  }

  error(message: string, ...args: any[]): void {
    this._log("error", message, ...args);
  }
}
</file>

<file path="The-Creator-AI-main/src/backend/services/message.service.ts">
import { Injectable } from "injection-js";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { mergeOpenEditorsWithSelectedFiles } from "@/backend/utils/mergeOpenEditorsWithSelectedFiles";
import { Services } from "./services";
import { ServerToClientChannel } from "@/common/ipc/channels.enum";

@Injectable()
export class MessageService {

  async sendMessage(
    serverIpc: ServerPostMessageManager,
    data: {
      chatHistory: any[];
      selectedFiles: string[];
    }
  ) {
    const { chatHistory, selectedFiles } = data;

    const updatedSelectedFiles = mergeOpenEditorsWithSelectedFiles(selectedFiles);

    const response = await Services.getLlmService().sendPrompt(
      chatHistory,
      updatedSelectedFiles
    );

    serverIpc.sendToClient(ServerToClientChannel.SendMessage, {
      message: response.response,
    });
  }

  async streamMessage(
    serverIpc: ServerPostMessageManager,
    data: {
      chatHistory: any[];
      selectedFiles: string[];
    }
  ) {
    try {
      const { chatHistory, selectedFiles } = data;

      const updatedSelectedFiles =
        mergeOpenEditorsWithSelectedFiles(selectedFiles);

      const response = await Services.getLlmService().sendPrompt(
        chatHistory,
        updatedSelectedFiles,
        (chunk: string) => {
          serverIpc.sendToClient(ServerToClientChannel.StreamMessage, { chunk });
        }
      );
        serverIpc.sendToClient(ServerToClientChannel.SendMessage, {
            message: response.response,
          });
    } catch (error: any) {
      serverIpc.sendToClient(ServerToClientChannel.SendMessage, error.message);
    }
  }
}
</file>

<file path="The-Creator-AI-main/src/backend/services/plan-exim.service.ts">
import { Injectable } from 'injection-js';
import * as vscode from 'vscode';
import { Services } from './services';
import { ChangePlan } from '@/client/views/change-plan.view/store/change-plan-view.state-type';
import { initialState } from '@/client/views/change-plan.view/store/change-plan-view.initial-state';

@Injectable()
export class PlanExImService {
    async exportAllChangePlans(): Promise<void> {
        const persistentStoreRepository = Services.getPersistentStoreRepository();
        const store = persistentStoreRepository.getChangePlanViewState();
        const changePlans = store?.changePlans || [];

        const jsonString = JSON.stringify(changePlans, null, 2);
        Services.getLoggerService().log(jsonString);

        // Get the workspace folder name
        const workspaceFolders = vscode.workspace.workspaceFolders;
        const workspaceFolderName = workspaceFolders && workspaceFolders.length > 0
            ? workspaceFolders[0].name
            : 'default'; // Provide a default if no workspace is open

        const options: vscode.SaveDialogOptions = {
            defaultUri: vscode.Uri.file(`all_change_plans_${workspaceFolderName}.json`),
            filters: {
                'JSON': ['json']
            }
        };

        const fileUri = await vscode.window.showSaveDialog(options);

        if (fileUri) {
            try {
                await vscode.workspace.fs.writeFile(fileUri, Buffer.from(jsonString, 'utf-8'));
                vscode.window.showInformationMessage(`All change plans exported successfully.`);
            } catch (error) {
                vscode.window.showErrorMessage(`Failed to export change plans: ${error}`);
            }
        }
    }

    async importAllChangePlans(): Promise<void> {
        const options: vscode.OpenDialogOptions = {
            canSelectMany: false,
            openLabel: 'Import',
            filters: {
                'JSON': ['json']
            }
        };

        const fileUri = await vscode.window.showOpenDialog(options);

        if (fileUri && fileUri[0]) {
            try {
                const fileContent = await vscode.workspace.fs.readFile(fileUri[0]);
                const plansJson: ChangePlan[] = JSON.parse(Buffer.from(fileContent).toString('utf-8'));

                console.log({ fileContent, plansJson });

                if (!Array.isArray(plansJson)) {
                    vscode.window.showErrorMessage('Invalid change plans format. Expected an array of plans.');
                    return;
                }

                const persistentStoreRepository =
                    Services.getPersistentStoreRepository();
                const store = persistentStoreRepository.getChangePlanViewState();
                const currentPlans = store?.changePlans || [];
                const updatedPlans = [...currentPlans];

                for (const plan of plansJson) {
                    if (!this.isValidChangePlan(plan)) {
                        vscode.window.showWarningMessage(`Skipping invalid change plan: ${(plan as ChangePlan).planTitle}`);
                        continue;
                    }

                    const existingPlanIndex = currentPlans.findIndex(
                        p => p.planTitle === plan.planTitle && p.planDescription === plan.planDescription
                    );

                    if (existingPlanIndex !== -1) {
                        // Update existing plan
                        updatedPlans[existingPlanIndex] = plan;
                    } else {
                        // Add new plan
                        updatedPlans.push(plan);
                    }
                }

                persistentStoreRepository.setChangePlanViewState({
                    ...initialState,
                    changePlans: updatedPlans,
                });
                vscode.window.showInformationMessage(`Change plans imported successfully.`);
            } catch (error) {
                vscode.window.showErrorMessage(`Failed to import change plans: ${error}`);
            }
        }
    }

    private isValidChangePlan(plan: any): plan is ChangePlan {
        return (
            typeof plan === 'object' &&
            plan !== null &&
            typeof plan.planTitle === 'string' &&
            typeof plan.planDescription === 'string' &&
            typeof plan.llmResponse === 'string' &&
            typeof plan.planJson === 'object' &&
            Array.isArray(plan.chatHistory) &&
            Array.isArray(plan.selectedFiles)
        );
    }
}
</file>

<file path="The-Creator-AI-main/src/backend/services/services.ts">
import { ReflectiveInjector } from "injection-js";
import "reflect-metadata";
import { FSService } from "./fs.service";
import { LlmService } from "./llm.service";
import { SettingsRepository } from "../repositories/settings.repository";
import { ChatRepository } from "../repositories/chat.respository";
import { PersistentStoreRepository } from "../repositories/persistent-store.repository";
import { LoggerService } from "./logger.service";
import { PlanExImService } from "./plan-exim.service";
import { CodeService } from "./code.service";
import { GitService } from "./git.service";
import { MessageService } from "./message.service";

export class Services {
  static injector: ReflectiveInjector;

  static async initialize(): Promise<void> {
    Services.injector = ReflectiveInjector.resolveAndCreate([
      ChatRepository,
      SettingsRepository,
      PersistentStoreRepository,
      FSService,
      LlmService,
      PlanExImService,
      LoggerService,
      CodeService,
      GitService,
      MessageService,
    ]);
  }

  static getFSService(): FSService {
    return Services.injector.get(FSService);
  }

  static getLlmService(): LlmService {
    return Services.injector.get(LlmService);
  }

  static getPersistentStoreRepository(): PersistentStoreRepository {
    return Services.injector.get(PersistentStoreRepository);
  }

  static getSettingsRepository(): SettingsRepository {
    return Services.injector.get(SettingsRepository);
  }

  static getPlanExImService(): PlanExImService {
    return Services.injector.get(PlanExImService);
  }

   static getCodeService(): CodeService {
    return Services.injector.get(CodeService);
  }

  static getLoggerService(): LoggerService {
    return Services.injector.get(LoggerService);
  }

   static getGitService(): GitService {
    return Services.injector.get(GitService);
  }

    static getMessageService(): MessageService {
    return Services.injector.get(MessageService);
  }
}
</file>

<file path="The-Creator-AI-main/src/backend/services/task-queue.service.ts">
import { Injectable } from "injection-js";
import { randomUUID } from "crypto";

interface Task<TaskType> {
  task: any;
  taskType: TaskType;
}

type Subscriber = {
  id: string;
  callback: (task: any) => Promise<any>;
};

@Injectable()
export class TaskQueueService<TaskType extends string> {
  private taskQueues: Record<TaskType, Task<any>[]> = {} as Record<
    TaskType,
    Task<any>[]
  >;
  private subscribers: Record<
    TaskType,
    Record<string, Subscriber>
  > = {} as Record<TaskType, Record<string, Subscriber>>;
  private isProcessing: Record<TaskType, boolean> = {} as Record<
    TaskType,
    boolean
  >;
  private responses: Record<
    TaskType,
    Record<string, any[]>
  > = {} as Record<TaskType, Record<string, any[]>>;
  private errors: Record<TaskType, Record<string, any[]>> =
    {} as Record<TaskType, Record<string, any[]>>;

  /**
   * Publishes a task to the queue.
   * @param taskType The type of the task
   * @param task The task to be added to the queue
   */
  publishTask(taskType: TaskType, task: any): void {
    if (!this.taskQueues[taskType]) {
      this.taskQueues[taskType] = [];
    }
    this.taskQueues[taskType].push({ task, taskType });
    if (!this.isProcessing[taskType]) {
      this.isProcessing[taskType] = false;
      this.processTasks(taskType);
    }
  }

  /**
   * Subscribes a callback to process tasks.
   * @param taskType The type of the task
   * @param subscriber A callback function that processes a task and returns a value.
   */
  async subscribe(
    taskType: TaskType,
    subscriber: (task: any) => Promise<any>
  ): Promise<string> {
    const subscriberId = randomUUID();
    if (!this.subscribers[taskType]) {
      this.subscribers[taskType] = {};
    }
    this.subscribers[taskType as string][subscriberId] = {
      id: subscriberId,
      callback: subscriber,
    };
    if (!this.isProcessing[taskType]) {
      this.isProcessing[taskType] = false;
      this.processTasks(taskType);
    }
    return subscriberId;
  }

  /**
   * Processes the tasks in the queue using the registered subscribers.
   * It processes each task sequentially, passing it to all the subscribers and stores the responses.
   */
  private async processTasks(taskType: TaskType): Promise<void> {
    if (this.isProcessing[taskType]) {
      return;
    }

    this.isProcessing[taskType] = true;
    while (this.taskQueues[taskType]?.length > 0) {
      const currentTask = this.taskQueues[taskType].shift();
      if (currentTask) {
        for (const subscriberId in this.subscribers[taskType]) {
          const subscriber = this.subscribers[taskType][subscriberId];
          try {
            const response = await subscriber.callback(currentTask.task);
            if (!this.responses[taskType]) {
              this.responses[taskType] = {};
            }
            if (!this.responses[taskType][subscriber.id]) {
              this.responses[taskType as string][subscriber.id] = [];
            }
            this.responses[taskType][subscriber.id].push({
              ...currentTask.taskType,
              response,
            });
          } catch (error: any) {
            if (!this.errors[taskType]) {
              this.errors[taskType] = {};
            }
            if (!this.errors[taskType][subscriber.id]) {
              this.errors[taskType as string][subscriber.id] = [];
            }
            this.errors[taskType][subscriber.id].push({
              ...currentTask.taskType,
              error,
            });
            console.error("Error while processing a task", error);
          }
        }
      }
    }
    this.isProcessing[taskType] = false;
  }

  getResponses(taskType: TaskType, subscriberId: string): any[] {
    return this.responses[taskType]?.[subscriberId] || [];
  }

  getErrors(taskType: TaskType, subscriberId: string): any[] {
    return this.errors[taskType]?.[subscriberId] || [];
  }
}
</file>

<file path="The-Creator-AI-main/src/backend/types/llm-service.enum.ts">
export enum LlmServiceEnum {
  GEMINI = "gemini",
  OPENAI = "openai",
  CLAUDE = "claude",
}
</file>

<file path="The-Creator-AI-main/src/backend/types/storage-keys.enum.ts">
export enum StorageKeysEnum {
  LlmApiKeys = "creatorExtension:llmApiKeys",
  ChatRepository = "creatorExtension:chatRepository",
  ChangePlanViewState = "creatorExtension:store:changePlanViewState",
}
</file>

<file path="The-Creator-AI-main/src/backend/utils/handleActiveTabChange.ts">
import * as vscode from "vscode";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { remoteSetChangePlanViewState } from "./remoteSetChangePlanViewState";

/**
 * Handles active tab changes in VS Code and sends the active file path to the server.
 *
 * @param serverIpc - The server IPC instance used to send messages to the server.
 */
export const handleActiveTabChange = (serverIpc: ServerPostMessageManager) => {
  remoteSetChangePlanViewState(
    serverIpc,
    "activeTab",
    vscode.window.activeTextEditor?.document.fileName
  );
  vscode.window.onDidChangeActiveTextEditor((editor) => {
    if (editor) {
      remoteSetChangePlanViewState(
        serverIpc,
        "activeTab",
        editor.document.fileName
      );
    }
  });
};
</file>

<file path="The-Creator-AI-main/src/backend/utils/mergeOpenEditorsWithSelectedFiles.ts">
import * as vscode from "vscode";

/**
 * Merges the paths of open editors with the provided selected files,
 * ensuring no duplicates and prioritizing open editor paths.
 *
 * @param selectedFiles Array of initially selected file paths.
 * @returns Array of file paths including open editor paths.
 */
export function mergeOpenEditorsWithSelectedFiles(
  selectedFiles: string[]
): string[] {
  const openEditors = vscode.window.tabGroups.all
    .flatMap((group) => group.tabs)
    .map((tab) =>
      tab.input instanceof vscode.TabInputText ||
      tab.input instanceof vscode.TabInputNotebook
        ? tab.input.uri?.fsPath || ""
        : ""
    );

  return openEditors.reduce((acc: string[], tabPath) => {
    const selectedAncestorPath = selectedFiles.find(
      (f) => tabPath.startsWith(f) && f !== tabPath
    );
    if (selectedAncestorPath) {
      return acc;
    } else {
      return [...acc, tabPath];
    }
  }, selectedFiles);
}
</file>

<file path="The-Creator-AI-main/src/backend/utils/remoteSetChangePlanViewState.ts">
import * as vscode from "vscode";
import { ServerToClientChannel } from "@/common/ipc/channels.enum";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { KeyPaths, KeyPathValue } from "@/common/utils/key-path";
import { ChangePlanViewStore } from "../../client/views/change-plan.view/store/change-plan-view.state-type";

/**
 * Handles active tab changes in VS Code and sends the active file path to the server.
 *
 * @param serverIpc - The server IPC instance used to send messages to the server.
 * @param keyPath - The key path to set in the change plan view store.
 * @param value - The value to set at the key path in the change plan view store.
 */
export const remoteSetChangePlanViewState = <
  Key extends KeyPaths<ChangePlanViewStore>
>(
  serverIpc: ServerPostMessageManager,
  keyPath: Key,
  value: KeyPathValue<Key, ChangePlanViewStore>
) => {
  serverIpc.sendToClient(ServerToClientChannel.SetChangePlanViewState, {
    keyPath,
    value,
  });
};
</file>

<file path="The-Creator-AI-main/src/client/components/AutoResizingTextarea.tsx">
import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

interface AutoResizingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    placeholder?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    minRows?: number;
    maxRows?: number;
}

const AutoResizingTextarea = forwardRef<HTMLTextAreaElement, AutoResizingTextareaProps>(
    ({ placeholder, value, onChange, minRows = 1, maxRows = Infinity, ...rest }, ref) => {
        const textareaRef = useRef<HTMLTextAreaElement>(null);

        useImperativeHandle(ref, () => textareaRef.current!, []);

        useEffect(() => {
            if (textareaRef.current) {
                textareaRef.current.style.height = '0px'; // Reset height to calculate scrollHeight
                const scrollHeight = textareaRef.current.scrollHeight;

                // Calculate min and max height based on minRows and maxRows
                const lineHeight = parseInt(getComputedStyle(textareaRef.current).lineHeight, 10) || 20; // Fallback to 20px if lineHeight is not found
                const minHeight = minRows * lineHeight;
                const maxHeight = maxRows * lineHeight;

                // Apply height constraints
                const height = Math.max(minHeight, Math.min(scrollHeight, maxHeight));
                textareaRef.current.style.height = height + 'px';
            }
        }, [value, minRows, maxRows]);

        return (
            <textarea
                ref={textareaRef}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                style={{ background: 'inherit' }}
                className={"resize-none overflow-hidden box-border bg-inherit" + (rest.className ? ` ${rest.className}` : '')}
                {...rest}
            />
        );
    }
);

AutoResizingTextarea.displayName = 'AutoResizingTextarea';

export default AutoResizingTextarea;
</file>

<file path="The-Creator-AI-main/src/client/components/Checkbox.tsx">
import React from "react";
import { useEffect, useRef } from "react";

interface CheckboxProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange'> {
    checked: boolean;
    indeterminate?: boolean;
    onChange: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = (props: CheckboxProps) => {
    const { checked, onChange, indeterminate, ...rest } = props;
    const cRef = useRef<any>(null);

    useEffect(() => {
        if (cRef.current) {
            cRef.current.indeterminate = indeterminate;
        }
    }, [cRef, indeterminate]);

    return (
        <input type="checkbox" ref={cRef} checked={checked} onChange={(e) => onChange(e.target.checked, e)} {...rest} />
    );
};

export default Checkbox;
</file>

<file path="The-Creator-AI-main/src/client/components/ErrorBoundary.tsx">
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log the error to an error tracking service (optional)
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        // You can integrate with an error tracking service here, e.g., Sentry, Rollbar

        this.setState({ hasError: true, error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div>
                    <h2>Something went wrong.</h2>
                    <p>{this.state.error?.message}</p>
                    {/* You can display more detailed error information here if needed */}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
</file>

<file path="The-Creator-AI-main/src/client/components/file-tree/FileTree.scss">
/* Import Tailwind directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Remove default VS Code body padding */
body {
  padding: 0;
}
</file>

<file path="The-Creator-AI-main/src/client/components/file-tree/FileTree.tsx">
import React, { useEffect, useState } from 'react';
import { MdChevronRight } from 'react-icons/md';
import TreeView from '../tree-view/TreeView'; // Import the generic TreeView
import { FileNode } from '../../../common/types/file-node';
import { getFileNodeByPath, addRemovePathInSelectedFiles } from './FileTree.utils';
import Checkbox from '../Checkbox';


interface FileTreeProps {
  data: FileNode[];
  onFileClick?: (filePath: string) => void;
  selectedFiles: string[];
  recentFiles: string[];
  activeFile?: string;
  updateSelectedFiles: (selectedFiles: string[]) => void;
  updateRecentFiles: (recentFiles: string[]) => void;
}

const FileTree: React.FC<FileTreeProps> = ({
  data,
  onFileClick,
  selectedFiles,
  recentFiles,
  activeFile,
  updateSelectedFiles,
  updateRecentFiles
}) => {

  const rootNode = data.find((node) => !node.name.includes('/'));

  // State to manage expanded nodes
  const [expandedNodes, setExpandedNodes] = useState<string[]>([rootNode?.name || '']);


  useEffect(() => {
    // If selectedFiles changes, expand the corresponding nodes
    const toExpand = new Set<string>();
    selectedFiles?.forEach((selectedFile) => {
      const pathParts = selectedFile.split('/');
      // Starting from the root, expand each directory in the path
      let currentPath = '';
      pathParts.forEach((part, index) => {
        currentPath += `${currentPath ? '/' : ''}${part}`;
        const node = getFileNodeByPath(data, currentPath);
        const isLast = index === pathParts.length - 1;
        if (node && !isLast) {
          toExpand.add(currentPath);
        }
      });
    });

    setExpandedNodes(prevExpandedNodes => {
      const newExpandedNodes = [...prevExpandedNodes].filter(path => !toExpand.has(path));
      return [...newExpandedNodes, ...Array.from(toExpand)];
    });
  }, [selectedFiles, data]);


  const handleNodeClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, node: FileNode, path: string) => {
    if ((e.target as HTMLElement)?.classList?.contains('checkbox')) {
      return;
    }
    const isDirectory = Array.isArray(node.children);
    if (isDirectory) {
      setExpandedNodes((prevExpandedNodes) => {
        const isExpanded = !!prevExpandedNodes.find((n) => n === path);
        return isExpanded
          ? prevExpandedNodes.filter((n) => n !== path)
          : [...prevExpandedNodes, path];
      });
    } else {
      onFileClick && onFileClick(path);
      const existingRecentFiles = recentFiles.filter(f => f !== path);
      updateRecentFiles([path, ...existingRecentFiles || []]);
    }
  };

  const renderCheckbox = (path: string) => {
    const isSelected = !!selectedFiles?.find(f => f === path);
    const isPartiallySelected = selectedFiles?.filter(f => f.includes(path) && f !== path);
    const selectedAncestors = selectedFiles?.filter(f => path.startsWith(f) && f !== path);
    return (
      <Checkbox
        data-testid="checkbox"
        indeterminate={isPartiallySelected?.length > 0}
        className="mr-2"
        checked={isSelected || !!selectedAncestors?.length}
        onChange={(_, e) => handleFileCheckboxChange(e, path)}
      />
    );
  };

  const handleFileCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, path: string) => {
    e.stopPropagation();
    e.preventDefault();
    updateSelectedFiles(addRemovePathInSelectedFiles(data, path, selectedFiles));
  };

  const renderFileNodeContent = (node: FileNode, path: string) => {
    const isDirectory = Array.isArray(node.children);
    const isActive = activeFile === path;

    return (
      <div
        className={`
          relative 
          cursor-pointer 
          px-2 py-px
          flex 
          items-center
          z-1
          ${isActive ? 'bg-[#e0dcdc]' : ''}
          ${isDirectory ? 'font-medium' : 'font-normal'}
        `}
      >
        {renderCheckbox(path)}
        <div className="whitespace-nowrap overflow-hidden text-ellipsis">{node.name}</div>
      </div>
    );
  };

  return (
    <div data-testid="file-tree" className="font-sans">
      <TreeView 
        data={data} 
        onNodeClick={(node) => {
          const path = node.absolutePath || '';
          handleNodeClick(undefined as any, node, path);
        }}
        renderNodeContent={(node) => renderFileNodeContent(node, node.absolutePath || '')} 
      />
    </div>
  );
};

export default FileTree;
</file>

<file path="The-Creator-AI-main/src/client/components/file-tree/FileTree.utils.ts">
import { FileNode } from "@/common/types/file-node";

export const addRemovePathInSelectedFiles = (
  files: FileNode[],
  path: string,
  selectedFiles: string[]
): string[] => {
  const isSelected = !!selectedFiles?.find((f) => f === path);
  if (isSelected) {
    // Remove this file from selectedFiles
    return selectedFiles?.filter((f) => f !== path);
  }

  const selectedAncestorPath = selectedFiles.find(
    (f) => path.startsWith(f) && f !== path
  );
  if (selectedAncestorPath) {
    // 1. Remove the ancestor from selectedFiles
    // 2. Add all children of the ancestor to selectedFiles except node which is another ancestor of the selected node
    // 3. Add all the siblings of the all the nodes between the ancestor and the selected node
    const pathParts = path.split("/");
    const ancestorParts = selectedAncestorPath.split("/");
    let siblingsAtEveryLevel: string[] = [];
    for (let i = ancestorParts.length - 1; i < pathParts.length - 1; i++) {
      const filePath = pathParts.slice(0, i + 1).join("/");
      const levelNode = getFileNodeByPath(files, filePath);
      if (levelNode) {
        siblingsAtEveryLevel = [
          ...siblingsAtEveryLevel,
          ...(levelNode.children
            ?.filter((c) => c.name !== pathParts[i + 1])
            ?.map((c) => `${filePath}/${c.name}`) || []),
        ];
      }
    }
    const newSelectedFiles = [
      ...selectedFiles.filter((f) => !f.includes(selectedAncestorPath)),
      ...siblingsAtEveryLevel,
    ];
    return newSelectedFiles;
  }

  // Remove all children and push this file into selectedFiles
  const newSelectedFiles = isSelected
    ? selectedFiles?.filter((f) => f !== path)
    : [...selectedFiles.filter((f) => !f.includes(path)), path];
  return newSelectedFiles;
};

export const getFileNodeByPath = (
  fileNodes: FileNode[],
  filePath: string
): FileNode | null => {
  const pathParts = filePath.split("/");
  // let's find the node in the data
  let node = {
    name: "",
    children: fileNodes,
  } as FileNode | undefined;
  for (const part of pathParts) {
    if (!node) {
      return null;
    }
    node = node.children?.find((child) => child.name === part);
  }
  return node || null;
};
</file>

<file path="The-Creator-AI-main/src/client/components/Modal.tsx">
import React, { useEffect, useRef, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsClosing(true);
      }
    };

    // Add event listeners when the modal is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      // Clean up the event listener when the modal closes
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close the modal after the closing animation finishes
  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, 200); // Adjust the timeout to match the animation duration

      return () => clearTimeout(timer);
    }
  }, [isClosing, onClose]);

  // VS Code's default modal has a dark background with a slightly transparent white overlay
  return isOpen ? (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-200 ${isClosing ? "opacity-0" : "opacity-100"
        }`}
    >
      <div className="fixed inset-0 bg-black bg-opacity-75"></div>
      <div
        ref={modalRef}
        className={`fixed inset-0 flex items-center justify-center p-4 transition-all duration-200 ${isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
      >
        <div
          className="bg-white rounded-md shadow-lg p-6 relative overflow-y-auto max-h-[90vh]"
          style={{ maxWidth: "700px" }}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {/* Modal content */}
          {children}
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
</file>

<file path="The-Creator-AI-main/src/client/components/ProgressSteps.tsx">
import * as React from "react";

export interface StepsConfig {
  [key: string]: {
    indicatorText: string;
    renderStep: () => JSX.Element;
  };
};

interface ProgressStepsProps {
  currentStep: string;
  handleStepClick: (step: string) => void;
  stepsConfig: StepsConfig;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({
  currentStep,
  handleStepClick,
  stepsConfig,
}) => {
  const steps = Object.keys(stepsConfig);

  return (
    <div className="flex items-center justify-between w-full pl-16 pr-16 pt-4 pb-12 border-b border-gray-600">
      {steps.map((step: string, index: number) => (
        <React.Fragment key={step}>
          <div
            className="flex flex-col items-center"
            onClick={() => handleStepClick(step)}
            data-testid={`step-indicator-${step}`}
          >
            <div
              className={`w-4 h-4 rounded-full ${
                currentStep === step ? "bg-blue-500" : "bg-gray-300"
              } cursor-pointer relative`}
            >
              <span
                className={`text-xs mt-4 whitespace-nowrap ${
                  currentStep === step ? "text-blue-500" : "text-gray-500"
                } absolute top-full left-1/2 -translate-x-1/2`}
              >
                {stepsConfig[step]?.indicatorText}
              </span>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              className="flex-grow border-t border-gray-300"
              data-testid="step-indicator-divider"
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressSteps;
</file>

<file path="The-Creator-AI-main/src/client/components/tree-view/TreeView.tsx">
import React, { useState } from 'react';
import { MdChevronRight } from 'react-icons/md';
import { getExpandedNodes } from './TreeView.utils';

export interface TreeNode {
    name: string;
    children?: TreeNode[];
    isExpanded?: boolean;
    [key: string]: any;
}

interface TreeViewProps {
    data: TreeNode[];
    onNodeClick?: (node: TreeNode) => void;
    renderNodeContent?: (node: TreeNode) => React.ReactNode;
}

const TreeView: React.FC<TreeViewProps> = ({ data, onNodeClick, renderNodeContent }) => {
    const [expandedNodes, setExpandedNodes] = useState<string[]>(getExpandedNodes(data));

    const handleNodeClick = (node: TreeNode) => {
        if (node.children) {
            setExpandedNodes((prevExpandedNodes) => {
                const isExpanded = prevExpandedNodes.includes(node.name);
                return isExpanded
                    ? prevExpandedNodes.filter((n) => n !== node.name)
                    : [...prevExpandedNodes, node.name];
            });
        }
        onNodeClick && onNodeClick(node);
    };

    const renderTreeNodes = (nodes: TreeNode[]) => {
        return nodes.map((node) => {
            const isExpanded = expandedNodes.includes(node.name);
            const isDirectory = !!node.children;

            return (
                <li key={node.name} className="relative">
                    <div
                        onClick={() => handleNodeClick(node)}
                        className={`
              cursor-pointer 
              px-2 
              flex 
              items-center 
              ${isDirectory ? 'font-medium' : 'font-normal'}
            `}
                    >
                        {isDirectory && (
                            <span
                                className={`
                  mr-2 
                  text-xl 
                  ${isExpanded ? 'rotate-90' : ''}
                  transition-transform 
                  duration-200
                  absolute
                  left-[-6px]
                `}
                            >
                                <MdChevronRight />
                            </span>
                        )}
                        {/* Use custom rendering if provided, otherwise display the node name */}
                        {renderNodeContent ? renderNodeContent(node) : node.name}
                    </div>
                    {isDirectory && isExpanded && (
                        <ul className="ml-4">{renderTreeNodes(node.children)}</ul>
                    )}
                </li>
            );
        });
    };

    return (
        <div className="font-sans">
            <ul>{renderTreeNodes(data)}</ul>
        </div>
    );
};

export default TreeView;
</file>

<file path="The-Creator-AI-main/src/client/components/tree-view/TreeView.utils.ts">
import { TreeNode } from "./TreeView";

export const getExpandedNodes = (data: TreeNode[]): string[] => {
  return data.reduce((acc, node) => {
    if (node.isExpanded) {
      acc.push(node.name);
    }
    if (node.children) {
      acc.push(...getExpandedNodes(node.children));
    }
    return acc;
  }, []);
};
</file>

<file path="The-Creator-AI-main/src/client/modules/api-keys-management.module/ApiKeysManagement.tsx">
import * as React from 'react';
import { useEffect, useState } from 'react';
import { LlmServiceEnum } from '@/backend/types/llm-service.enum';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import Modal from '@/client/components/Modal';

const ApiKeyManagement: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<Record<LlmServiceEnum, string[]>>(
    Object.values(LlmServiceEnum).reduce((acc, service) => ({ ...acc, [service]: [] }), {} as any)
  );
  const [newApiKey, setNewApiKey] = useState('');
  const [selectedService, setSelectedService] = useState<LlmServiceEnum | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for the modal

  const clientIpc = ClientPostMessageManager.getInstance();

  useEffect(() => {
    const fetchApiKeys = async () => {
      clientIpc.sendToServer(ClientToServerChannel.GetLLMApiKeys, {});
    };

    fetchApiKeys();
  }, []);

  useEffect(() => {
    const handleSendLLMApiKeys = (message: { apiKeys: Record<LlmServiceEnum, string[]> | undefined }) => {
      setApiKeys(message.apiKeys || {} as any);
    };

    clientIpc.onServerMessage(ServerToClientChannel.SendLLMApiKeys, handleSendLLMApiKeys);
  }, []);

  const handleAddApiKey = async () => {
    if (newApiKey.trim() === '' || !selectedService) {
      return;
    }

    clientIpc.sendToServer(ClientToServerChannel.SetLLMApiKey, { service: selectedService, apiKey: newApiKey });
    setNewApiKey(''); // Clear the input field
    setSelectedService(null); // Reset selected service
    setIsModalOpen(false); // Close the modal
  };

  const handleDeleteApiKey = async (service: LlmServiceEnum, apiKey: string) => {
    clientIpc.sendToServer(ClientToServerChannel.DeleteLLMApiKey, { service, apiKeyToDelete: apiKey });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-editor-fg">API Key Management</h2>
      <button
        onClick={handleOpenModal}
        className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-button-bg hover:bg-button-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button-bg mb-4"
      >
        Add API Key
      </button>
      {/* Display existing keys or a message if no keys are present */}
      {Object.keys(apiKeys).some((service) => apiKeys[service as LlmServiceEnum].length > 0) ? (
        Object.entries(apiKeys).map(([service, keys]) => (
          <div key={service} className="mb-6">
            <h3 className="text-lg font-medium text-editor-fg">{service}</h3>
            <ul className="list-disc pl-5">
              {keys.map((apiKey, index) => (
                <li key={index} className="flex items-center justify-between py-2">
                  <span className="truncate text-editor-fg">{apiKey}</span>
                  <button
                    onClick={() => handleDeleteApiKey(service as LlmServiceEnum, apiKey)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <div className="mb-4">
          <p className="text-gray-600">No API keys added yet.</p>
        </div>
      )}

      {/* Modal for adding new API keys */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="p-6">
          <h3 className="text-lg font-bold mb-4 text-editor-fg">Add New API Key</h3>
          <div className="mb-4">
            <label htmlFor="serviceSelect" className="block text-sm font-medium text-gray-700">
              Select Service:
            </label>
            <select
              id="serviceSelect"
              value={selectedService || ''}
              onChange={(e) => setSelectedService(e.target.value as LlmServiceEnum)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-settings-input-bg"
            >
              <option value="">Select a service</option>
              {Object.values(LlmServiceEnum).map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="apiKeyInput" className="block text-sm font-medium text-gray-700">
              API Key:
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="password" // Make the input field a password field
                name="apiKeyInput"
                id="apiKeyInput"
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-grow block w-full min-w-0 rounded-none rounded-l-md sm:text-sm border-gray-300 p-2 bg-settings-input-bg"
                placeholder="Enter your API key"
                value={newApiKey}
                onChange={(e) => setNewApiKey(e.target.value)}
                disabled={!selectedService}
              />
              <button
                onClick={handleAddApiKey}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-button-bg hover:bg-button-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button-bg"
                disabled={!selectedService || newApiKey.trim() === ''}
              >
                Add
              </button>
            </div>
          </div>
          <button
            onClick={handleCloseModal}
            className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ApiKeyManagement;
</file>

<file path="The-Creator-AI-main/src/client/modules/commit.module/Commit.tsx">
import AutoResizingTextarea from '@/client/components/AutoResizingTextarea';
import { useStore } from '@/client/store/useStore';
import { commitStagedChanges } from '@/client/views/change-plan.view/logic/commitStagedChanges';
import { changePlanViewStoreStateSubject, getChangePlanViewState } from '@/client/views/change-plan.view/store/change-plan-view.store';
import React, { useState } from 'react';

const Commit: React.FC = () => {
    const {
        chatHistory,
    } = useStore(changePlanViewStoreStateSubject);
    const [commitTitle, setCommitTitle] = useState(getChangePlanViewState('changePlans')?.[getChangePlanViewState('changePlans').length - 1]?.planTitle || '');
    const [commitDescription, setCommitDescription] = useState(getChangePlanViewState('changePlans')?.[getChangePlanViewState('changePlans').length - 1]?.planDescription || '');

    const handleCommit = async () => {
        commitStagedChanges(commitTitle, commitDescription);
    };

    return (
        <div className="p-4">
            {chatHistory.length === 0 ? (
                <p className="text-gray-600">No changes to commit.</p>
            ) : (
                <div className="flex flex-col">
                    <div className="mb-4">
                        <label htmlFor="commitTitle" className="block text-sm font-medium text-gray-700">
                            Commit Title:
                        </label>
                        <AutoResizingTextarea
                            id="commitTitle"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={commitTitle}
                            onChange={(e) => setCommitTitle(e.target.value)}
                            placeholder="Enter a short, descriptive commit title"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="commitDescription" className="block text-sm font-medium text-gray-700">
                            Commit Description (Optional):
                        </label>
                        <AutoResizingTextarea
                            id="commitDescription"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={commitDescription}
                            onChange={(e) => setCommitDescription(e.target.value)}
                            placeholder="Enter a more detailed description of the changes (optional)"
                            minRows={3} // Adjust as needed
                            maxRows={10} // Adjust as needed
                        />
                    </div>
                    <button
                        onClick={handleCommit}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Commit
                    </button>
                </div>
            )}
        </div>
    );
};

export default Commit;
</file>

<file path="The-Creator-AI-main/src/client/modules/context.module/Context.tsx">
import React, { useEffect, useState } from 'react';
import { FileNode } from '@/common/types/file-node';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import FileTree from '@/client/components/file-tree/FileTree';
import { handleFileClick } from '@/client/views/change-plan.view/logic/handleFileClick';
import { setChangePlanViewState as setState } from '@/client/views/change-plan.view/store/change-plan-view.logic';
import { getChangePlanViewState } from '@/client/views/change-plan.view/store/change-plan-view.store';

const Context: React.FC = () => {
    const clientIpc = ClientPostMessageManager.getInstance();
    const selectedFiles = getChangePlanViewState("selectedFiles");
    const files = getChangePlanViewState("files");
    const [recentFiles, setRecentFiles] = useState<string[]>([]);
    const [activeFile, setActiveFile] = useState<string>();
    const [activeContext, setActiveContext] = useState<'code' | 'features' | 'architecture' | 'guidelines'>('code');
    useEffect(() => {
        const handleSendWorkspaceFiles = ({ files }: { files: FileNode[] }) => {
            setState("files")(files);
        };
        clientIpc.onServerMessage(
            ServerToClientChannel.SendWorkspaceFiles,
            handleSendWorkspaceFiles
        );
    
            // Request workspace files on component mount
            clientIpc.sendToServer(ClientToServerChannel.RequestWorkspaceFiles, {});
    
    
    }, []);
    
    const handleContextChange = (context: 'code' | 'features' | 'architecture' | 'guidelines') => {
        setActiveContext(context);
    };    return (
        <div className="p-4 overflow-y-auto overflow-x-hidden">
            <div className='flex mb-4'>
                <button 
                  className={`mr-2 px-4 py-2 border rounded ${activeContext === 'code' ? 'bg-blue-500 text-white' : 'border-gray-300'}`}
                  onClick={() => handleContextChange('code')}
                >
                  Code
                </button>
                 <button 
                    className={`mr-2 px-4 py-2 border rounded ${activeContext === 'features' ? 'bg-blue-500 text-white' : 'border-gray-300'}`}
                    onClick={() => handleContextChange('features')}
                >
                  Features
                </button>
                 <button 
                  className={`mr-2 px-4 py-2 border rounded ${activeContext === 'architecture' ? 'bg-blue-500 text-white' : 'border-gray-300'}`}
                  onClick={() => handleContextChange('architecture')}
                >
                  Architecture
                </button>
                 <button 
                 className={`mr-2 px-4 py-2 border rounded ${activeContext === 'guidelines' ? 'bg-blue-500 text-white' : 'border-gray-300'}`}
                 onClick={() => handleContextChange('guidelines')}
                >
                    Guidelines
                  </button>
            </div>
             {/* Render FileTree for each root node */}
             {activeContext === 'code' && files.map((rootNode, index) => (
                <FileTree
                    key={index}
                    data={[rootNode]}
                    onFileClick={(filePath) => handleFileClick({
                    clientIpc,
                    filePath,
                    setActiveFile,
                })}
                selectedFiles={selectedFiles}
                recentFiles={recentFiles}
                activeFile={activeFile}
                updateSelectedFiles={(files) => setState("selectedFiles")(files)}
                updateRecentFiles={setRecentFiles}
            />
             ))}
        {activeContext !== 'code' && <div className="text-gray-500"> {activeContext} Tree View is under development. </div>}
            {!files.length && (
                <div className="text-gray-500">Loading files...</div>
            )}
        </div>
    );
};
export default Context;
</file>

<file path="The-Creator-AI-main/src/client/modules/plan.module/components/file-card.tsx">
import { useStore } from '@/client/store/useStore';
import { changePlanViewStoreStateSubject } from '@/client/views/change-plan.view/store/change-plan-view.store';
import * as React from "react";
import { MdDescription } from 'react-icons/md';
import { ClientToServerChannel } from '@/common/ipc/channels.enum';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { getChangePlanViewState } from '../../../views/change-plan.view/store/change-plan-view.store';
import { setChangePlanViewState } from '@/client/views/change-plan.view/store/change-plan-view.logic';
import { ServerToClientChannel } from '@/common/ipc/channels.enum';
import Markdown from "markdown-to-jsx";

interface FileCardProps {
    fileName: string;
    operation: string;
    recommendations: string[];
    filePath: string;
}

const FileCard: React.FC<FileCardProps> = ({ fileName, operation, recommendations, filePath }) => {
    const { fileChunkMap } = useStore(changePlanViewStoreStateSubject);
    const clientIpc = ClientPostMessageManager.getInstance();
    const chatHistory = getChangePlanViewState('chatHistory');
    const selectedFiles = getChangePlanViewState('selectedFiles');
    const isLoading = fileChunkMap[filePath]?.isLoading;
    const fileContent = fileChunkMap[filePath]?.fileContent;

    React.useEffect(() => {
        clientIpc.onServerMessage(ServerToClientChannel.StreamFileCode, (data) => {
            const { filePath, chunk } = data;
            console.log({ filePath, chunk });
            const fileChunkMap = getChangePlanViewState('fileChunkMap');
            const localFilePath = Object.keys(fileChunkMap).find((key) => key.includes(filePath) || filePath.includes(key));

            if (!fileChunkMap[localFilePath]?.isLoading) {
                return;
            }

            const updatedFileChunkMap = {
                ...fileChunkMap,
                [localFilePath]: {
                    ...fileChunkMap[localFilePath],
                    fileContent: (fileChunkMap[localFilePath]?.fileContent || '') + chunk
                }
            };
            setChangePlanViewState('fileChunkMap')(updatedFileChunkMap);
        });

        clientIpc.onServerMessage(ServerToClientChannel.SendFileCode, (data) => {
            const { filePath, fileContent } = data;
            console.log({ filePath, fileContent });
            const fileChunkMap = getChangePlanViewState('fileChunkMap');
            const localFilePath = Object.keys(fileChunkMap).find((key) => key.includes(filePath) || filePath.includes(key));
            const updatedFileChunkMap = {
                ...fileChunkMap,
                [localFilePath]: {
                    ...fileChunkMap[localFilePath],
                    fileContent,
                    isLoading: false
                }
            };
            setChangePlanViewState('fileChunkMap')(updatedFileChunkMap);
        });
    }, []);

    const handleRequestOpenFile = (filePath: string) => {
        clientIpc.sendToServer(ClientToServerChannel.RequestOpenFile, {
            filePath
        });
    };


    return (
        <div className="file-card flex flex-grow flex-col bg-sidebar-bg border border-gray-700 rounded p-4 shadow-md min-w-0 relative">
            <div className="flex items-center mb-2">
                <MdDescription
                    size={18}
                    className={`mr-2 cursor-pointer ${isLoading ? 'text-gray-400' : 'hover:text-blue-500'} `}
                />
                <h4 className="text-base font-medium text-editor-fg cursor-pointer" onClick={() => handleRequestOpenFile(filePath)}>{fileName}</h4>
            </div>
            <p className="text-gray-600 mb-3">{operation}</p>
            <ul className="list-disc list-inside">
                {recommendations.map((recommendation, index) => (
                    <li key={index} className="text-gray-400 text-xs mb-2">
                         <Markdown>{JSON.stringify(recommendation, null, 2)}</Markdown>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileCard;
</file>

<file path="The-Creator-AI-main/src/client/modules/plan.module/formatted-plan-preview.tsx">
import { ClientToServerChannel, ServerToClientChannel } from "@/common/ipc/channels.enum";
import { ClientPostMessageManager } from "@/common/ipc/client-ipc";
import { useStore } from "@/client/store/useStore";
import { setChangePlanViewState } from "@/client/views/change-plan.view/store/change-plan-view.logic";
import { changePlanViewStoreStateSubject, getChangePlanViewState } from "@/client/views/change-plan.view/store/change-plan-view.store";
import * as React from "react";
import { useEffect, useState } from "react";
import { MdFileDownload } from "react-icons/md";
import FileCard from "./components/file-card"; // Import the new FileCard component

interface FormattedPlanPreviewProps {
  jsonData: any;
}

const FormattedPlanPreview: React.FC<FormattedPlanPreviewProps> = ({
  jsonData,
}) => {
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const { activeTab } = useStore(changePlanViewStoreStateSubject);
  const clientIpc = ClientPostMessageManager.getInstance();
  const chatHistory = getChangePlanViewState("chatHistory");
  const selectedFiles = getChangePlanViewState("selectedFiles");
  const [loadingFile, setLoadingFile] = useState<string | null>(null);
  const { fileChunkMap } = useStore(changePlanViewStoreStateSubject);

  useEffect(() => {
    clientIpc.onServerMessage(ServerToClientChannel.StreamFileCode, (data) => {
      const { filePath, chunk } = data;
      console.log({ filePath, chunk });
      const fileChunkMap = getChangePlanViewState("fileChunkMap");
      const localFilePath = Object.keys(fileChunkMap).find(
        (key) => key.includes(filePath) || filePath.includes(key)
      );

      if (!fileChunkMap[localFilePath]?.isLoading) {
        return;
      }

      const updatedFileChunkMap = {
        ...fileChunkMap,
        [localFilePath]: {
          ...fileChunkMap[localFilePath],
          fileContent: (fileChunkMap[localFilePath]?.fileContent || "") + chunk,
        },
      };
      setChangePlanViewState("fileChunkMap")(updatedFileChunkMap);
    });

    clientIpc.onServerMessage(ServerToClientChannel.SendFileCode, (data) => {
      const { filePath, fileContent } = data;
      console.log({ filePath, fileContent });
      const fileChunkMap = getChangePlanViewState("fileChunkMap");
      const localFilePath = Object.keys(fileChunkMap).find(
        (key) => key.includes(filePath) || filePath.includes(key)
      );
      const updatedFileChunkMap = {
        ...fileChunkMap,
        [localFilePath]: {
          ...fileChunkMap[localFilePath],
          fileContent,
          isLoading: false,
        },
      };
      setChangePlanViewState("fileChunkMap")(updatedFileChunkMap);
      setLoadingFile(null);
    });
  }, []);

  const handleHeaderClick = (index: number) => {
    setCurrentFileIndex(index);
    clientIpc.sendToServer(ClientToServerChannel.RequestOpenFile, {
      filePath: jsonData.code_plan[index]?.filename,
    });
  };

  useEffect(() => {
    const matchingCardIndex = jsonData.code_plan.findIndex(
      (item: any) =>
        item?.filename && activeTab && activeTab.endsWith(item.filename)
    );
    if (matchingCardIndex !== -1) {
      setCurrentFileIndex(matchingCardIndex);
    }
  }, [activeTab, jsonData.code_plan]);

  const handleRequestFileCode = (filePath: string) => {
    const fileChunkMap = getChangePlanViewState("fileChunkMap");
    const updatedFileChunkMap = {
      ...fileChunkMap,
      [filePath]: {
        isLoading: true,
        fileContent: "",
      },
    };
    setChangePlanViewState("fileChunkMap")(updatedFileChunkMap);
    clientIpc.sendToServer(ClientToServerChannel.RequestStreamFileCode, {
      filePath,
      chatHistory,
      selectedFiles,
    });
    setLoadingFile(filePath);
  };

  return jsonData ? (
    <div className="formatted-plan-preview min-h-0 pt-2 flex flex-col flex-grow focus:outline-none overflow-y-auto">
      <h3 className="flex justify-center text-xs font-bold mb-2 px-4 text-center">
        {jsonData.title}
      </h3>
      <p
        className="flex justify-center text-gray-700 px-4 text-center"
      >
        {jsonData.description}
      </p>
      {/* Pagination Dots */}
      <div className="flex flex-col my-4">
        {jsonData.code_plan.map((item: any, index: number) => (
          <div key={index}>
            <button
              onClick={() => handleHeaderClick(index)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-hover-bg ${
                index === currentFileIndex ? "bg-hover-bg" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.filename?.split("/").pop() || ""}
                </span>
                {!fileChunkMap[item.filename]?.isLoading ? (
                  <MdFileDownload
                    size={18}
                    className={`ml-2 cursor-pointer text-blue-500`}
                    onClick={() => handleRequestFileCode(item.filename)}
                  />
                ) : null}
                {fileChunkMap[item.filename]?.isLoading && (
                  <span className="loader mr-2">
                    <div className="spinner w-4 h-4 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin ml-2"></div>
                  </span>
                )}
                {fileChunkMap[item.filename]?.isLoading &&
                fileChunkMap[item.filename]?.fileContent?.length ? (
                  <span className="text-xs text-gray-500 whitespace-nowrap overflow-x-auto">
                    ({fileChunkMap[item.filename]?.fileContent?.length} ++)
                  </span>
                ) : null}
              </div>
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-grow mx-4">
        {jsonData.code_plan.map((item: any, index: number) => {
          if (item?.filename && index === currentFileIndex) {
            // Only render the card at the currentFileIndex
            return (
              <FileCard
                key={index}
                fileName={item.filename?.split("/").pop() || ""}
                operation={item.operation}
                recommendations={item.recommendations}
                filePath={item.filename}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  ) : null;
};

export default FormattedPlanPreview;
</file>

<file path="The-Creator-AI-main/src/client/modules/plan.module/plan-input-box.tsx">
import * as React from 'react';
import { BsSend } from 'react-icons/bs';
import AutoResizingTextarea from '@/client/components/AutoResizingTextarea';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import { useStore } from '@/client/store/useStore';
import { changePlanViewStoreStateSubject, getChangePlanViewState } from '@/client/views/change-plan.view/store/change-plan-view.store';
import { handleSubmitPlanRequest } from '../../views/change-plan.view/logic/handleSubmitPlanRequest';
import { FileNode } from '@/common/types/file-node';

interface PlanStepInputProps {
    handleChange: (value: string) => void;
    isUpdateRequest?: boolean;
    files: FileNode[];
}

const PlanInputBox: React.FC<PlanStepInputProps> = ({ isUpdateRequest, handleChange, files }) => {
    const { selectedFiles } = useStore(changePlanViewStoreStateSubject);
    const [suggestions, setSuggestions] = React.useState<string[]>([]);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = React.useState<number | null>(null);
    const [showSuggestions, setShowSuggestions] = React.useState(false);
    const inputRef = React.useRef<HTMLTextAreaElement>(null);
    const changeDescription = getChangePlanViewState("changeDescription");
    const isLoading = getChangePlanViewState("isLoading");

    const clientIpc = ClientPostMessageManager.getInstance();

    const handleSuggestionAccept = (suggestion: string) => {
        handleChange(
            changeDescription.split(' ').slice(0, -1).join(' ')
            + (changeDescription.split(' ').length > 1 ? ' ' : '')
            + suggestion + ' ');
        setSelectedSuggestionIndex(null);
        setShowSuggestions(false);
    };

    const handleSubmit = () => {
        handleSubmitPlanRequest(clientIpc, files);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (showSuggestions) {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedSuggestionIndex((prevIndex) => (prevIndex === null || prevIndex === 0) ? suggestions.length - 1 : prevIndex - 1);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedSuggestionIndex((prevIndex) => (prevIndex === null || prevIndex === suggestions.length - 1) ? 0 : prevIndex + 1);
            } else if (e.key === 'Enter') {
                if (selectedSuggestionIndex !== null) {
                    e.preventDefault();
                    const selectedSuggestion = suggestions[selectedSuggestionIndex];
                    handleSuggestionAccept(selectedSuggestion);
                }
            } else if (e.key === 'Escape') {
                setShowSuggestions(false);
            }
        }
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey || e.altKey)) {
            e.preventDefault();
            handleSubmit();
        }
    };

    React.useEffect(() => {
        const fetchSuggestions = () => {
            if (changeDescription.split(' ').pop().startsWith('@')) {
                clientIpc.sendToServer(ClientToServerChannel.RequestSymbols, {
                    query: changeDescription.split(' ').pop().slice(1)
                });
            } else {
                setShowSuggestions(false); // Hide suggestions if "@" is not the last character
            }
        };

        const timeoutId = setTimeout(fetchSuggestions, 300); // Adjust delay as needed

        return () => clearTimeout(timeoutId);
    }, [changeDescription, selectedFiles]);

    React.useEffect(() => {
        clientIpc.onServerMessage(ServerToClientChannel.SendSymbols, (message) => {
            const receivedSuggestions = (message.symbols || []).map((symbol: { name: string }) => symbol.name); // Adjust based on actual symbol structure
            setSuggestions(receivedSuggestions);
            setShowSuggestions(true);
        });
    }, []);

    return (
        <div className="flex flex-col">
            <div className="relative p-4 flex flex-col relative" data-testid="change-plan-input-step">
                {showSuggestions && suggestions.length > 0 && (
                    <ul className="absolute bottom-full bg-sidebar-bg left-0 mb-1 border border-gray-300 rounded max-h-40 overflow-y-auto shadow-lg z-10 m-4"
                        style={{
                            width: inputRef.current?.clientWidth,
                        }}>
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                className={`p-2 cursor-pointer hover:bg-hover-bg ${index === selectedSuggestionIndex ? 'bg-hover-bg' : ''}`}
                                onClick={() => {
                                    handleSuggestionAccept(suggestion);
                                }}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
                <AutoResizingTextarea
                    ref={inputRef}
                    className="p-2 border border-gray-300 rounded font-normal mb-2 pr-10"
                    placeholder={isUpdateRequest ? "Describe the changes you want to make to the plan..." : "Describe the code changes you want to plan..."}
                    value={changeDescription}
                    onChange={(e) => handleChange(e.target.value)}
                    disabled={isLoading}
                    data-testid="change-description-textarea"
                    onKeyDown={handleKeyDown}
                    minRows={3}
                    maxRows={10}
                    autoFocus
                />
            </div>
            {inputRef.current && <BsSend
                className="fixed transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-blue-500"
                style={{
                    left: inputRef.current?.getClientRects()?.[0]?.right - 35,
                    top: inputRef.current?.getClientRects()?.[0]?.bottom - 20,
                }}
                size={20}
                onClick={handleSubmit}
                data-testid="submit-change-description-button"
            />}
        </div>
    );
};

export default PlanInputBox;
</file>

<file path="The-Creator-AI-main/src/client/modules/plan.module/Plan.tsx">
import { setChangePlanViewState as setState } from "@/client/views/change-plan.view/store/change-plan-view.logic";
import { getChangePlanViewState } from "@/client/views/change-plan.view/store/change-plan-view.store";
import { parseJsonResponse } from "@/common/utils/parse-json";
import Markdown from "markdown-to-jsx";
import * as React from "react";
import { useEffect, useState } from "react";
import FormattedPlanPreview from "./formatted-plan-preview";
import PlanInputBox from "./plan-input-box";

const Plan: React.FC = () => {
  const llmResponse = getChangePlanViewState("llmResponse");
  const files = getChangePlanViewState("files");
  const [responseType, setResponseType] = useState<"json" | "markdown" | null>(
    null
  );
  const [parsedResponse, setParsedResponse] = useState<any>(null);

  useEffect(() => {
    const jsonData = parseJsonResponse(llmResponse);
    if (jsonData) {
      setResponseType("json");
      setParsedResponse(jsonData);
    } else {
      setResponseType("markdown");
    }
  }, [llmResponse]);

  const renderResponse = () => {
    switch (responseType) {
      case "json":
        return <FormattedPlanPreview jsonData={parsedResponse} />;
      case "markdown":
        return <Markdown>{llmResponse}</Markdown>;
      default:
        return null;
    }
  };

  console.log({ files });
  return (
    <div className="plan-step flex flex-grow flex-col min-h-0">
      <div className="flex flex-grow flex-col min-h-0">{renderResponse()}</div>
      <PlanInputBox
        isUpdateRequest={
          !!(getChangePlanViewState("chatHistory").length > 0 && llmResponse)
        }
        handleChange={setState("changeDescription")}
        files={[]}
      />
    </div>
  );
};

export default Plan;
</file>

<file path="The-Creator-AI-main/src/client/store/store.ts">
import { BehaviorSubject } from "rxjs";

export class Store<T, A> extends BehaviorSubject<T> {
  constructor(private val: T) {
    super(val);
  }

  _next(value: T, action: A, actionVariant?: string): void {
    const devLogs = new URL(window.location.href).searchParams.has("devLogs");
    if (devLogs) {
      if (actionVariant) {
        console.log(action, actionVariant, value);
      } else {
        console.log(action, value);
      }
    }
    super.next(value);
  }
}
</file>

<file path="The-Creator-AI-main/src/client/store/useStore.ts">
import { useEffect, useState } from "react";
import { Store } from "./store";

export const useSelector = <S, A, R>(
  subject: Store<S, A>,
  selector: (state: S) => R
) => {
  const [state, setState] = useState<S>(subject.getValue());

  useEffect(() => {
    const subscription = subject.subscribe((newState) => {
      if (selector(newState) !== selector(state)) {
        setState(newState);
      }
    });

    return () => subscription.unsubscribe();
  }, [subject, selector]);

  return selector(state);
};

export const useStore = <S, A>(subject: Store<S, A>) => {
  return useSelector(subject, (state) => state);
};
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/index.ts">
import { VIEW_TYPES } from "@/common/view-types";
import { onMessage } from "./on-mesage";

export const viewConfig = {
  entry: "changePlanView.js",
  type: VIEW_TYPES.SIDEBAR.CHANGE_PLAN,
  handleMessage: onMessage,
};
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/logic/commitStagedChanges.ts">
import { ClientToServerChannel } from "@/common/ipc/channels.enum";
import { ClientPostMessageManager } from "@/common/ipc/client-ipc";

export const commitStagedChanges = (message: string, description: string) => {
  const clientIpc = ClientPostMessageManager.getInstance();
  clientIpc.sendToServer(ClientToServerChannel.CommitStagedChanges, {
    message,
    description,
  });
};
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/logic/getSelectedFiles.ts">
import { getChangePlanViewState } from "@/client/views/change-plan.view/store/change-plan-view.store";
import { FileNode } from "@/common/types/file-node";

export const getSelectedFiles = (files: FileNode[]) => {
  const selectedFiles = getChangePlanViewState("selectedFiles");
  // Create an array to store absolute paths of selected files
  const absoluteSelectedFiles: string[] = [];

  // Iterate through updatedSelectedFiles and find corresponding absolute paths in files
  selectedFiles.forEach((relativePath) => {
    let matchingNode: FileNode | undefined = undefined;
    files.find((node) => {
      // Iterate through files to find the matching absolute path
      function findMatchingNode(node: FileNode) {
        if (node.absolutePath && node.absolutePath.endsWith(relativePath)) {
          return node;
        }
        if (node.children) {
          for (const child of node.children) {
            const matchingNode = findMatchingNode(child);
            if (matchingNode) {
              return matchingNode;
            }
          }
        }
        return undefined;
      }
      matchingNode = findMatchingNode(node);
    });

    if (matchingNode) {
      absoluteSelectedFiles.push(matchingNode.absolutePath || "");
    }
  });
  return absoluteSelectedFiles;
};
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/logic/handleCommitMessageSuggestions.ts">
import { ServerToClientChannel } from "@/common/ipc/channels.enum";
import { ClientPostMessageManager } from "@/common/ipc/client-ipc";
import { setChangePlanViewState } from "../store/change-plan-view.logic";

export const handleCommitMessageSuggestions = () => {
  const clientIpc = ClientPostMessageManager.getInstance();
  clientIpc.onServerMessage(
    ServerToClientChannel.SendCommitMessageSuggestions,
    (message) => {
      setChangePlanViewState("commitSuggestions")(message.suggestions);
      setChangePlanViewState("commitSuggestionsLoading")(false);
    }
  );
};
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/logic/handleFileClick.ts">
import { ClientToServerChannel } from "@/common/ipc/channels.enum";
import { ClientPostMessageManager } from "@/common/ipc/client-ipc";

export const handleFileClick = ({
  clientIpc,
  setActiveFile,
  filePath,
}: {
  clientIpc: ClientPostMessageManager;
  setActiveFile: React.Dispatch<React.SetStateAction<string>>;
  filePath: string;
}) => {
  setActiveFile(filePath);

  // Send the selected editor path to the extension
  clientIpc.sendToServer(ClientToServerChannel.SendSelectedEditor, {
    editor: {
      fileName: filePath.split("/").pop() || "",
      filePath,
      languageId: "", // You might need to determine the languageId here
    },
  });
};
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/logic/handleSubmitPlanRequest.ts">
import { AGENTS } from "@/common/constants/agents.constants";
import { ClientToServerChannel } from "@/common/ipc/channels.enum";
import {
  setChangePlanViewState as setState,
  setChangePlanViewState,
} from "@/client/views/change-plan.view/store/change-plan-view.logic";
import { getChangePlanViewState } from "@/client/views/change-plan.view/store/change-plan-view.store";
import { ClientPostMessageManager } from "@/common/ipc/client-ipc";
import { FileNode } from "@/common/types/file-node";
import { getSelectedFiles } from "./getSelectedFiles";

export const handleSubmitPlanRequest = (
  clientIpc: ClientPostMessageManager,
  files: FileNode[]
) => {
  setState("isLoading")(true);
  const llmResponse = getChangePlanViewState("llmResponse");
  const changeDescription = getChangePlanViewState("changeDescription");
  if (!changeDescription) {
    setState("isLoading")(false);
    const fileChunkMap = getChangePlanViewState("fileChunkMap");
    const updatedFileChunkMap = Object.keys(fileChunkMap).reduce(
      (acc, filePath) => {
        acc[filePath] = {
          ...fileChunkMap[filePath],
          isLoading: false,
        };
        return acc;
      },
      {}
    );
    setChangePlanViewState("fileChunkMap")(updatedFileChunkMap);
    return;
  }

  const selectedFiles = getSelectedFiles(files);

  const isUpdatingPlan =
    getChangePlanViewState("chatHistory").length && llmResponse;

  let chatHistory = getChangePlanViewState("chatHistory");
  const messagesToSend = [];

  if (chatHistory.length > 0) {
    if (chatHistory.length > 2) {
      messagesToSend.push(chatHistory[1]); // Add second message if it exists
    }
    messagesToSend.push(chatHistory[chatHistory.length - 1]); // Add last message
  }

  const newChatHistory = [
    ...(isUpdatingPlan
      ? [
          ...chatHistory,
          {
            user: "instructor",
            message: AGENTS["Code Plan Update"]?.systemInstructions,
          },
        ]
      : [
          {
            user: "instructor",
            message: AGENTS["Code Plan"]?.systemInstructions,
          },
        ]),
    ...(messagesToSend || []),
    {
      user: "user",
      message: (isUpdatingPlan ? `Revise the plan:\n` : "") + changeDescription,
    },
  ];
  setState("chatHistory")(newChatHistory); // Update chatHistory in the store

  clientIpc.sendToServer(ClientToServerChannel.SendStreamMessage, {
    chatHistory: newChatHistory,
    selectedFiles,
  });
};
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/logic/requestCommitMessageSuggestions.ts">
import { ClientPostMessageManager } from "@/common/ipc/client-ipc";
import { getChangePlanViewState } from "../store/change-plan-view.store";
import { ClientToServerChannel } from "@/common/ipc/channels.enum";

export const requestCommitMessageSuggestions = () => {
  const chatHistory = getChangePlanViewState("chatHistory");
  const clientIpc = ClientPostMessageManager.getInstance();
  clientIpc.sendToServer(
    ClientToServerChannel.RequestCommitMessageSuggestions,
    {
      chatHistory,
    }
  );
};
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/logic/setupChannelHandlers.ts">
import {
    ClientToServerChannel,
    ServerToClientChannel,
} from "@/common/ipc/channels.enum";
import { ClientPostMessageManager } from "@/common/ipc/client-ipc";
import { FileNode } from "@/common/types/file-node";
import { KeyPaths, KeyPathValue } from "@/common/utils/key-path";
import { ChangePlanSteps } from "@/client/views/change-plan.view/view.constants";
import { updateOrCreateChangePlan } from "@/client/views/change-plan.view/logic/updateOrCreateChangePlan";
import {
    setChangePlanViewState as setState
} from "@/client/views/change-plan.view/store/change-plan-view.logic";
import { ChangePlanViewStore } from "@/client/views/change-plan.view/store/change-plan-view.state-type";
import { getChangePlanViewState } from "@/client/views/change-plan.view/store/change-plan-view.store";

export const setupChannelHandlers = () => {
  const clientIpc = ClientPostMessageManager.getInstance();

  const handleSendMessage = ({ message }: { message: string }) => {
    setState("isLoading")(false);
    setState("llmResponse")(message);
    setState("changeDescription")("");
    setState("currentStep")(ChangePlanSteps.Plan);

    // Update chat history
    setState("chatHistory")([
      ...getChangePlanViewState("chatHistory"),
      { user: "bot", message },
    ]);

    // Update or add the new change plan
    updateOrCreateChangePlan(message);
  };

  const handleStreamMessage = ({ chunk }: { chunk: string }) => {
    setState("llmResponse")(getChangePlanViewState("llmResponse") + chunk);
  };

  const handleSendWorkspaceFiles = ({ files }: { files: FileNode[] }) => {
     setState("files")(files);
  };

  const handleSendFileCode = ({
    fileContent,
    filePath,
  }: {
    fileContent: string;
    filePath: string;
  }) => {
    if (filePath) {
      try {
        console.log(fileContent);
        console.log(`File ${filePath} updated successfully.`);
      } catch (err) {
        console.error(`Error updating file ${filePath}:`, err);
      }
    }
  };

  const handleSetChangePlanViewState = <
    Key extends KeyPaths<ChangePlanViewStore>
  >(data: {
    keyPath: Key;
    value: KeyPathValue<Key, ChangePlanViewStore>;
  }) => {
    console.log({ data });
    setState(data.keyPath)(data.value);
  };

  clientIpc.onServerMessage(
    ServerToClientChannel.SendMessage,
    handleSendMessage
  );
  clientIpc.onServerMessage(
    ServerToClientChannel.StreamMessage,
    handleStreamMessage
  );

  // Request workspace files on component mount
  clientIpc.sendToServer(ClientToServerChannel.RequestWorkspaceFiles, {});

  // Listen for workspace files response
  clientIpc.onServerMessage(
    ServerToClientChannel.SendWorkspaceFiles,
    handleSendWorkspaceFiles
  );

  // Listener for SendFileCode
  clientIpc.onServerMessage(
    ServerToClientChannel.SendFileCode,
    handleSendFileCode
  );

  clientIpc.onServerMessage(
    ServerToClientChannel.SetChangePlanViewState,
    handleSetChangePlanViewState
  );

  clientIpc.sendToServer(ClientToServerChannel.FetchStore, {
    storeName: "changePlanViewState",
  });
};
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/logic/updateOrCreateChangePlan.ts">
import { parseJsonResponse } from "@/common/utils/parse-json";
import { getChangePlanViewState } from "@/client/views/change-plan.view/store/change-plan-view.store";
import { setChangePlanViewState } from "@/client/views/change-plan.view/store/change-plan-view.logic";

export const updateOrCreateChangePlan = (llmResponse: string) => {
  try {
    const planJson = parseJsonResponse(llmResponse);
    if (!planJson) {
      return;
    }

    const planTitle = planJson.title;
    const planDescription = planJson.description;

    const changePlans = getChangePlanViewState("changePlans");
    const existingPlanIndex = changePlans.findIndex(
      (plan) => plan.planTitle === planTitle
    );

    const updatedChangePlans = [...changePlans];

    if (existingPlanIndex !== -1) {
      // Update existing plan
      updatedChangePlans[existingPlanIndex] = {
        ...updatedChangePlans[existingPlanIndex],
        planDescription,
        llmResponse,
        planJson,
        chatHistory: getChangePlanViewState("chatHistory"),
        selectedFiles: getChangePlanViewState("selectedFiles"),
        lastUpdatedAt: Date.now(),
      };
    } else {
      // Create a new plan
      updatedChangePlans.push({
        planTitle,
        planDescription,
        llmResponse,
        planJson,
        chatHistory: getChangePlanViewState("chatHistory"),
        selectedFiles: getChangePlanViewState("selectedFiles"),
        lastUpdatedAt: Date.now(),
      });
    }

    setChangePlanViewState("changePlans")(updatedChangePlans);
  } catch (error) {
    console.error("Error parsing or updating change plan:", error);
  }
};
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/on-mesage.ts">
import { ChatMessage } from "@/backend/repositories/chat.respository";
import { Services } from "@/backend/services/services";
import {
  ClientToServerChannel,
  ServerToClientChannel,
} from "@/common/ipc/channels.enum";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { parseJsonResponse } from "@/common/utils/parse-json";
import { ChangePlanViewStore } from "@/client/views/change-plan.view/store/change-plan-view.state-type";
import { handleActiveTabChange } from "@/backend/utils/handleActiveTabChange";
import * as vscode from "vscode";
import { MessageService } from "@/backend/services/message.service";

// Function to handle messages for the change plan view
export function onMessage(serverIpc: ServerPostMessageManager) {
  const fsService = Services.getFSService();
  const messageService = Services.getMessageService();
  serverIpc.onClientMessage(ClientToServerChannel.RequestWorkspaceFiles, () =>
    fsService.handleWorkspaceFilesRequest(serverIpc)
  );

  serverIpc.onClientMessage(
    ClientToServerChannel.RequestFileCode,
    async (data) => {
      const res = await Services.getCodeService().requestFileCode(
        data.filePath,
        data.chatHistory,
        data.selectedFiles
      );
      serverIpc.sendToClient(ServerToClientChannel.SendFileCode, res);
    }
  );

  serverIpc.onClientMessage(
    ClientToServerChannel.RequestStreamFileCode,
    async (data) => {
      const res = await Services.getCodeService().requestFileCode(
        data.filePath,
        data.chatHistory,
        data.selectedFiles,
        (filePath, chunk) => {
          serverIpc.sendToClient(ServerToClientChannel.StreamFileCode, {
            filePath,
            chunk,
          });
        }
      );
      serverIpc.sendToClient(ServerToClientChannel.SendFileCode, res);
    }
  );

  serverIpc.onClientMessage(ClientToServerChannel.SendMessage, (data) =>
      messageService.sendMessage(serverIpc, data)
  );

  serverIpc.onClientMessage(ClientToServerChannel.SendStreamMessage, (data) => {
      messageService.streamMessage(serverIpc, data)
  });

  serverIpc.onClientMessage(
    ClientToServerChannel.RequestOpenFile,
    async (data) => {
      fsService.handleFileOpen(data);
    }
  );

  serverIpc.onClientMessage(ClientToServerChannel.PersistStore, (data) => {
    const { storeName, storeState } = data;
    if (storeName === "changePlanViewState") {
      Services.getPersistentStoreRepository().setChangePlanViewState(
        storeState
      );
    }
  });

  serverIpc.onClientMessage(ClientToServerChannel.FetchStore, (data) => {
    const { storeName } = data;
    if (storeName === "changePlanViewState") {
      const storeState =
        Services.getPersistentStoreRepository().getChangePlanViewState();
      console.log("storeState", storeState);
      for (const key in storeState) {
        serverIpc.sendToClient(ServerToClientChannel.SetChangePlanViewState, {
          keyPath: key as keyof ChangePlanViewStore,
          value: storeState[key],
        });
      }
    }
  });

  handleActiveTabChange(serverIpc);

  // Handle request for commit message suggestions
  serverIpc.onClientMessage(
    ClientToServerChannel.RequestCommitMessageSuggestions,
    async ({ chatHistory }) => {
      // Add a user message at the end of the chat history prompting for commit message suggestions in JSON format.
      const userMessage: ChatMessage = {
        user: "user",
        message:
          "Please provide commit message suggestions in JSON format. Here's an example of the expected JSON structure:" +
          JSON.stringify({
            suggestions: ["Add feature X", "Fix bug Y", "Update dependency Z"],
          }),
      };

      // Send a message to the LLM service with the updated chat history.
      const llmResponse = await Services.getLlmService().sendPrompt([
        ...chatHistory.filter(
          (message) => message.user === "bot" || message.user === "user"
        ),
        userMessage,
      ]);

      // Parse the LLM response using parseJsonResponse from parse-json.
      const parsedResponse = parseJsonResponse(llmResponse.response);

      // Extract commit message suggestions from the parsed JSON.
      const suggestions = parsedResponse.suggestions;

      // Send the suggestions to the client.
      serverIpc.sendToClient(
        ServerToClientChannel.SendCommitMessageSuggestions,
        { suggestions }
      );
    }
  );

  // Handle commit action with the selected message
  serverIpc.onClientMessage(
    ClientToServerChannel.CommitStagedChanges,
    async (message) => {
      console.log("Committing staged changes with message:", message.message);
      console.log(
        "Committing staged changes with description:",
        message.description
      );

      // Set commitSuggestionsLoading to true before initiating the commit
      serverIpc.sendToClient(ServerToClientChannel.SetChangePlanViewState, {
        keyPath: "commitSuggestionsLoading",
        value: true,
      });

      try {
        // Use the publicly available VS Code command to commit the staged changes with the provided message
        const gitService = Services.getGitService();
        await gitService.gitCommit(message.message, message.description);
      } catch (error) {
        // Handle any errors during the commit process
        console.error("Error committing changes:", error);
      } finally {
        // Reset commit suggestions and loading state after the commit, regardless of success or failure
        serverIpc.sendToClient(ServerToClientChannel.SetChangePlanViewState, {
          keyPath: "commitSuggestions",
          value: [],
        });
        serverIpc.sendToClient(ServerToClientChannel.SetChangePlanViewState, {
          keyPath: "commitSuggestionsLoading",
          value: false,
        });
      }
    }
  );

  // Handle get LLM API keys request
  serverIpc.onClientMessage(ClientToServerChannel.GetLLMApiKeys, async () => {
    try {
      const apiKeys = await Services.getSettingsRepository().getLLMApiKeys();
      serverIpc.sendToClient(ServerToClientChannel.SendLLMApiKeys, {
        apiKeys,
      });
    } catch (error) {
      console.error("Error getting LLM API keys:", error);
      // Handle the error appropriately, e.g., send an error message to the client
    }
  });

  // Handle set LLM API key request
  serverIpc.onClientMessage(
    ClientToServerChannel.SetLLMApiKey,
    async ({ service, apiKey }) => {
      try {
        await Services.getSettingsRepository().setLLMApiKey(service, apiKey);

        // After successfully setting the API key, you might want to re-fetch
        // the API keys and send them back to the client to update the UI.
        const updatedApiKeys =
          await Services.getSettingsRepository().getLLMApiKeys();
        serverIpc.sendToClient(ServerToClientChannel.SendLLMApiKeys, {
          apiKeys: updatedApiKeys,
        });
      } catch (error) {
        console.error("Error setting LLM API key:", error);
        // Handle the error appropriately, e.g., send an error message to the client
      }
    }
  );

  // Handle delete LLM API key request
  serverIpc.onClientMessage(
    ClientToServerChannel.DeleteLLMApiKey,
    async ({ service, apiKeyToDelete }) => {
      try {
        await Services.getSettingsRepository().deleteLLMApiKey(
          service,
          apiKeyToDelete
        );

        // After successfully deleting the API key, you might want to re-fetch
        // the API keys and send them back to the client to update the UI.
        const updatedApiKeys =
          await Services.getSettingsRepository().getLLMApiKeys();
        serverIpc.sendToClient(ServerToClientChannel.SendLLMApiKeys, {
          apiKeys: updatedApiKeys,
        });
      } catch (error) {
        console.error("Error deleting LLM API key:", error);
        // Handle the error appropriately, e.g., send an error message to the client
      }
    }
  );

  // Handle symbol retrieval request
  serverIpc.onClientMessage(
    ClientToServerChannel.RequestSymbols,
    async ({ query }) => {
      try {
        const symbolInformation = await vscode.commands.executeCommand<
          vscode.SymbolInformation[]
        >("vscode.executeWorkspaceSymbolProvider", query || "");
        const files = await vscode.workspace.findFiles(`**/${query}**`);

        serverIpc.sendToClient(ServerToClientChannel.SendSymbols, {
          symbols: [
            ...files
              .map((file) => ({
                name: file.path?.split("/").pop(),
                kind: vscode.SymbolKind.File,
                location: file.path,
                range: new vscode.Range(
                  new vscode.Position(0, 0),
                  new vscode.Position(0, 0)
                ),
              }))
              ?.filter(
                (symbol, index, self) =>
                  self.findIndex((s) => s.name === symbol.name) === index
              )
              ?.filter((_, index) => index < 3),
            ...symbolInformation
              .map((symbol) => ({
                name: symbol.name,
                kind: symbol.kind,
                location: symbol.location.uri.path,
                range: symbol.location.range,
              }))
              ?.filter(
                (symbol, index, self) =>
                  self.findIndex((s) => s.name === symbol.name) === index
              )
              ?.filter((_, index) => index < 5),
          ],
        });
      } catch (error) {
        console.error("Error retrieving symbols:", error);
        // Handle the error appropriately, e.g., send an error message to the client
      }
    }
  );
}
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/store/change-plan-view.initial-state.ts">
import { ChangePlanViewStore } from "./change-plan-view.state-type";
import { ChangePlanSteps } from "../view.constants";

export const initialState: ChangePlanViewStore = {
  changeDescription: "",
  isLoading: false,
  llmResponse: "",
  currentStep: ChangePlanSteps.Plan,
  selectedFiles: [],
  chatHistory: [],
  activeTab: undefined,
  changePlans: [],
  commitSuggestions: [],
  commitSuggestionsLoading: false,
  fileChunkMap: {},
  files: [],
};
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/store/change-plan-view.logic.ts">
import { ClientToServerChannel } from "@/common/ipc/channels.enum";
import { ClientPostMessageManager } from "@/common/ipc/client-ipc";
import {
  KeyPaths,
  KeyPathValue,
  setNestedValue,
} from "@/common/utils/key-path";
import { initialState } from "./change-plan-view.initial-state";
import { ChangePlanViewStore } from "./change-plan-view.state-type";
import { changePlanViewStoreStateSubject } from "./change-plan-view.store";

export const setNewEmptyChangePlan = () => {
  const newValue: ChangePlanViewStore = {
    ...changePlanViewStoreStateSubject.getValue(),
    changeDescription: "",
    llmResponse: "",
    chatHistory: [],
    fileChunkMap: {},
    isLoading: false,
  };
  changePlanViewStoreStateSubject._next(
    newValue,
    "Change Plan View : SET NEW EMPTY CHANGE PLAN"
  );

  const clientIpc = ClientPostMessageManager.getInstance();
  clientIpc.sendToServer(ClientToServerChannel.PersistStore, {
    storeName: "changePlanViewState",
    storeState: newValue,
  });
};

export const setChangePlanViewState =
  <Key extends KeyPaths<ChangePlanViewStore>>(keyPath: Key) =>
  (value: KeyPathValue<Key, ChangePlanViewStore>) => {
    const newValue = setNestedValue(
      changePlanViewStoreStateSubject.getValue(),
      keyPath,
      value
    );
    changePlanViewStoreStateSubject._next(
      {
        ...newValue,
      },
      `Change Plan View : SET ${keyPath}`
    );

    const clientIpc = ClientPostMessageManager.getInstance();
    clientIpc.sendToServer(ClientToServerChannel.PersistStore, {
      storeName: "changePlanViewState",
      storeState: newValue,
    });
  };
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/store/change-plan-view.state-type.ts">
import { ChangePlanSteps } from "../view.constants";
import { ChatMessage } from "@/backend/repositories/chat.respository";
import { FileNode } from "@/common/types/file-node";

export interface ChangePlan {
  planTitle: string;
  planDescription: string;
  llmResponse: string;
  planJson: any;
  chatHistory: ChatMessage[];
  selectedFiles: string[];
  lastUpdatedAt: number;
}

export interface ChangePlanViewStore {
  changeDescription: string;
  isLoading: boolean;
  llmResponse: string;
  currentStep: ChangePlanSteps;
  selectedFiles: string[];
  chatHistory: ChatMessage[];
  activeTab: string | undefined;
  changePlans: ChangePlan[];
  fileChunkMap: Record<
    string,
    {
      isLoading: boolean;
      fileContent: string;
    }
  >;
    files: FileNode[];
  commitSuggestionsLoading: boolean;
  commitSuggestions: string[];
}
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/store/change-plan-view.store.ts">
import { Store } from "@/client/store/store";
import { ChangePlanViewStore } from "./change-plan-view.state-type";
import { initialState } from "./change-plan-view.initial-state";
import { KeyPaths, getNestedValue } from "@/common/utils/key-path";

type ChangePlanViewActions =
  | `Change Plan View : SET ${KeyPaths<ChangePlanViewStore>}`
  | "Change Plan View : SET NEW EMPTY CHANGE PLAN";

export const changePlanViewStoreStateSubject = new Store<
  ChangePlanViewStore,
  ChangePlanViewActions
>(initialState);

export const getChangePlanViewState = (
  keyPath?: KeyPaths<ChangePlanViewStore>
) => getNestedValue(changePlanViewStoreStateSubject.getValue(), keyPath);
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/view.constants.ts">
export enum ChangePlanSteps {
  ApiKeyManagement = 'ApiKeyManagement',
  Context = 'Context',
  Plan = 'Plan',
  Commit = 'Commit', 
}
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/view.scss">
/* Import Tailwind directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Remove default VS Code body padding */
body {
    padding: 0;
}
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/view.tsx">
import ErrorBoundary from "@/client/components/ErrorBoundary";
import { StepsConfig } from '@/client/components/ProgressSteps';
import ApiKeyManagement from '@/client/modules/api-keys-management.module/ApiKeysManagement';
import Commit from '@/client/modules/commit.module/Commit';
import Context from '@/client/modules/context.module/Context';
import Plan from '@/client/modules/plan.module/Plan';
import { useStore } from "@/client/store/useStore";
import { Log } from "@/common/utils/firebaseLogger";
import * as React from "react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom/client";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon
import ProgressSteps from "../../components/ProgressSteps";
import { setupChannelHandlers } from "./logic/setupChannelHandlers";
import { setChangePlanViewState as setState } from "./store/change-plan-view.logic";
import { changePlanViewStoreStateSubject } from "./store/change-plan-view.store";
import { ChangePlanSteps } from "./view.constants";
import "./view.scss";

const App = () => {
  const { isLoading, currentStep: currentTab } = useStore(
    changePlanViewStoreStateSubject
  );
  const changePlanSteps: StepsConfig = {
    [ChangePlanSteps.ApiKeyManagement]: {
      indicatorText: "API Keys",
      renderStep: () => <ApiKeyManagement />,
    },
    [ChangePlanSteps.Context]: {
      indicatorText: "Context",
      renderStep: () => <Context />,
    },
    [ChangePlanSteps.Plan]: {
      indicatorText: "Plan",
      renderStep: () => <Plan />,
    },
    [ChangePlanSteps.Commit]: {
      indicatorText: "Commit",
      renderStep: () => <Commit />,
    },
  };
  

  // Initialize Firebase
  useEffect(() => {
    Log.sidebarOpened();
  }, []);

  useEffect(() => {
    setupChannelHandlers();
  }, []);

  const handleStepClick = (step: ChangePlanSteps) => {
    setState("currentStep")(step);
  };

  const renderLoader = () => (
    <div
      className="loader fixed inset-0 flex justify-center items-center bg-opacity-50 bg-[#202020] z-50"
      data-testid="loader"
    >
      <FaSpinner className="spinner text-2xl animate-spin text-white" />
    </div>
  );

  return (
    <div className="h-full fixed inset-0 flex flex-col justify-between bg-editor-bg">
      <ProgressSteps
        stepsConfig={changePlanSteps}
        currentStep={currentTab}
        handleStepClick={handleStepClick}
      />
      <div className="flex flex-grow flex-col overflow-hidden">
        {/* Dropdown removed */}
        {changePlanSteps[currentTab].renderStep()}
      </div>
      {isLoading && renderLoader()} {/* Conditionally render the loader */}
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("change-plan-view-root")!
);

root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
</file>

<file path="The-Creator-AI-main/src/client/views/chat.view/index.ts">
import { VIEW_TYPES } from "@/common/view-types";
import { onMessage } from "./on-mesage";

export const viewConfig = {
  entry: "chatView.js",
  type: VIEW_TYPES.SIDEBAR.CHAT,
  handleMessage: onMessage,
};
</file>

<file path="The-Creator-AI-main/src/client/views/chat.view/on-mesage.ts">
import { ChatRepository } from "@/backend/repositories/chat.respository";
import { Services } from "@/backend/services/services";
import {
  ClientToServerChannel,
  ServerToClientChannel,
} from "@/common/ipc/channels.enum";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";

// Function to handle messages for the chat view
export async function onMessage(serverIpc: ServerPostMessageManager) {
  serverIpc?.onClientMessage(
    ClientToServerChannel.SendMessage,
    async (data) => {
      const userMessage = data.chatHistory?.[0];

      // Fetch Chat History from Repository
      let existingChat = await ChatRepository.getActiveChat();
      await ChatRepository.addMessageToChat(existingChat.id, userMessage);
      existingChat = await ChatRepository.getActiveChat();

      const response = await Services.getLlmService().sendPrompt(
        existingChat.messages
      );

      serverIpc.sendToClient(ServerToClientChannel.SendMessage, {
        message: response.response,
      });

      await ChatRepository.addMessageToChat(existingChat.id, {
        user: "bot",
        message: response.response,
      });
    }
  );
  serverIpc?.onClientMessage(
    ClientToServerChannel.RequestChatHistory,
    async (data) => {
      const chatId = data.chatId;
      const chat = await ChatRepository.getChatById(chatId);
      if (!chat) {
        return;
      }
      serverIpc.sendToClient(ServerToClientChannel.SendChatHistory, {
        chatId: chat.id,
        messages: chat.messages,
      });
    }
  );
}
</file>

<file path="The-Creator-AI-main/src/client/views/chat.view/view.scss">
/* Import Tailwind directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Remove default VS Code body padding */
body {
    padding: 0;
}
</file>

<file path="The-Creator-AI-main/src/client/views/chat.view/view.tsx">
// the-creator-ai/src/sidebar/Sidebar.tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import Markdown from 'markdown-to-jsx';
import { FaUser, FaRobot } from 'react-icons/fa';
import './view.scss';

const App = () => {
  const [messages, setMessages] = React.useState<{ user: string; message: string }[]>([]);
  const [userInput, setUserInput] = React.useState('');
  const clientIpc = ClientPostMessageManager.getInstance();

  const sendMessage = () => {
    if (userInput.trim() === '') return;

    // Send message to extension
    clientIpc.sendToServer(ClientToServerChannel.SendMessage, {
      chatHistory: [{ user: 'user', message: userInput }],
      selectedFiles: []
    });

    // Update local messages (for display)
    setMessages([...messages, { user: 'user', message: userInput }]);
    setUserInput('');
  };

  React.useEffect(() => {
    clientIpc.onServerMessage(ServerToClientChannel.SendMessage, ({ message }) => {
      setMessages((messages) => ([...messages, { user: 'AI', message }]));
    });
    clientIpc.onServerMessage(ServerToClientChannel.SendChatHistory, ({ messages }) => {
      setMessages(() => ([...messages]));
    });
    clientIpc.sendToServer(ClientToServerChannel.RequestChatHistory, {});
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex items-start my-2 p-2 ${message.user === 'user' ? 'user' : 'bot'}`}>
            <div className={`mr-2 text-lg ${message.user === 'user' ? 'text-blue-500' : 'text-gray-400'}`}>
              {message.user === 'user' ? <FaUser /> : <FaRobot />}
            </div>
            <div className="flex-grow">
              <Markdown>{message.message}</Markdown>
            </div>
          </div>
        ))}
      </div>
      <div className="flex p-4 border-t">
        <input
          type="text"
          className="flex-grow p-2 border rounded mr-2"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message here"
        />
        <button className="p-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-700" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('chat-view-root')!);
root.render(<App />);
</file>

<file path="The-Creator-AI-main/src/client/views/file-explorer.view/index.ts">
import { VIEW_TYPES } from "@/common/view-types";
import { onMessage } from "./on-mesage";

export const viewConfig = {
  entry: "fileExplorerView.js",
  type: VIEW_TYPES.SIDEBAR.FILE_EXPLORER,
  handleMessage: onMessage,
};
</file>

<file path="The-Creator-AI-main/src/client/views/file-explorer.view/on-mesage.ts">
import { Services } from "@/backend/services/services";
import {
  ClientToServerChannel,
  ServerToClientChannel,
} from "@/common/ipc/channels.enum";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import * as vscode from "vscode";

// Function to handle messages for the file explorer view
export function onMessage(
  serverIpc: ServerPostMessageManager
) {onMessage
  serverIpc.onClientMessage(
    ClientToServerChannel.RequestWorkspaceFiles,
    async (data) => {
      const workspaceRoots =
      vscode.workspace.workspaceFolders?.map((folder) => folder.uri) || [];
      const fsService = Services.getFSService();
      const files = await fsService.getFilesRespectingGitignore();
      const fileTree = fsService.createFileTree(workspaceRoots, files);

      // Use the VSCode API to retrieve workspace files
      // const files = await vscode.workspace.findFiles("**/*");

      // // Format the files into the expected response structure
      // const formattedFiles = files.map((file) => ({
      //   name: file.path.split("/").pop() || "", // Extract file name from path
      //   path: file.fsPath, // Use fsPath for the actual file path
      //   // type: vscode.workspace.fs
      //   //   .stat(file)
      //   //   .then((stat) => (stat.isDirectory() ? "directory" : "file")),
      // }));

      // const fileTypes = await Promise.all(
      //   formattedFiles.map((file) => file.type)
      // );
      // Send the files back to the client
      serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, {
        // files: formattedFiles.map((file, index) => ({
        //   ...file,
        //   // type: fileTypes[index],
        //   type: 'file'
        // })),
        files: fileTree
      });
    }
  );
}
</file>

<file path="The-Creator-AI-main/src/client/views/file-explorer.view/view.scss">
/* Import Tailwind directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Remove default VS Code body padding */
body {
    padding: 0;
}
</file>

<file path="The-Creator-AI-main/src/client/views/file-explorer.view/view.tsx">
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import FileTree from '../../components/file-tree/FileTree';
import { useState, useEffect } from 'react';
import { FileNode } from '@/common/types/file-node';

const App = () => {
    const [files, setFiles] = useState<FileNode[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [recentFiles, setRecentFiles] = useState<string[]>([]);
    const [activeFile, setActiveFile] = useState<string>();

    const clientIpc = ClientPostMessageManager.getInstance();

    useEffect(() => {
        // Request workspace files on component mount
        clientIpc.sendToServer(ClientToServerChannel.RequestWorkspaceFiles, {});

        // Listen for workspace files response
        clientIpc.onServerMessage(ServerToClientChannel.SendWorkspaceFiles, ({ files }) => {
            setFiles(files);
        });
    }, []);

    const handleFileClick = (filePath: string) => {
        setActiveFile(filePath);
        // Send the selected editor path to the extension
        clientIpc.sendToServer(ClientToServerChannel.SendSelectedEditor, {
            editor: {
                fileName: filePath.split('/').pop() || '',
                filePath,
                languageId: '', // You might need to determine the languageId here
            },
        });
    };


    return (
        <div className="h-full overflow-y-auto">
            {files.length > 0 ? (
                <FileTree
                    data={files}
                    onFileClick={handleFileClick}
                    selectedFiles={selectedFiles}
                    recentFiles={recentFiles}
                    activeFile={activeFile}
                    updateSelectedFiles={setSelectedFiles}
                    updateRecentFiles={setRecentFiles}
                />
            ) : (
                <div className="p-4 text-gray-500">Loading files...</div>
            )}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('file-explorer-root')!);
root.render(<App />);
</file>

<file path="The-Creator-AI-main/src/client/views/index.ts">
import { viewConfig as changePlanViewConfig } from "./change-plan.view";
import { viewConfig as chatViewConfig } from "./chat.view";
import { viewConfig as fileExplorerViewConfig } from "./file-explorer.view";
import * as vscode from "vscode";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { getNonce, getViewHtml } from "@/common/utils/view-html";

export const views = [
  changePlanViewConfig,
  chatViewConfig,
  fileExplorerViewConfig,
];

export const serverIPCs: Record<string, ServerPostMessageManager> = {};

export function registerViews(context: vscode.ExtensionContext) {
  views.forEach((viewConfig) => {
    context.subscriptions.push(
      vscode.window.registerWebviewViewProvider(viewConfig.type, {
        resolveWebviewView: (webviewView, _, token) => {
          webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [context.extensionUri],
          };

          const nonce = getNonce();
          webviewView.webview.html = getViewHtml({
            webview: webviewView.webview,
            nonce,
            scriptUri: webviewView.webview
              .asWebviewUri(
                vscode.Uri.joinPath(
                  context.extensionUri,
                  "dist",
                  viewConfig.entry
                )
              )
              .toString(),
          });

          const serverIpc = ServerPostMessageManager.getInstance(
            webviewView.webview.onDidReceiveMessage,
            (data: any) => webviewView.webview.postMessage(data)
          );

          serverIPCs[viewConfig.type] = serverIpc;

          viewConfig.handleMessage(serverIpc);
        },
      })
    );
  });
}
</file>

<file path="The-Creator-AI-main/src/common/constants/agents.constants.ts">
export const AGENTS = {
  "Stubbed Code": {
    id: 1,
    hidden: true,
    name: "Stubbed code",
    systemInstructions: `Now I want you to assist me by providing targeted code snippets from requested files, replacing irrelevant or lengthy sections of **existing code** with stubs for brevity and clarity. You should **not** generate stubs for new code that is intended to be written.
    
    **Output:** You will provide a code snippet in the same programming language as the requested file. The snippet should adhere to the following guidelines:
    
        *   **Include Relevant Code:** Present the code that directly addresses the user's request or the core logic of the file.
        *   **Replace with Stubs (Existing Code Only):** Substitute unrelated or lengthy sections of existing code with clear, concise stubs.
        *   **Do Not Stub New Code:** If the user's request involves writing new code, do not generate stubs for that code. Instead, clearly indicate where the new code should be placed within the existing code structure.
        *   **Maintain Structure:** Preserve the overall structure of the file, including import statements, comments, and the order of elements.
        *   **Use Comments for Clarity:** Add comments to explain the purpose of stubs or to indicate where omitted code would normally reside and where new code should be inserted.
    
    **Stub Creation (Existing Code Only):**
    
        *   **Identify Irrelevance:** Determine which parts of the existing code are not relevant to the user's request or the file's main purpose.
        *   **Summarize with Comments:** Replace lengthy code blocks with a comment briefly describing their function (e.g., "// Database connection setup").
        *   **Preserve Signatures:** For functions and classes, keep the signatures intact but replace their bodies with ellipses (\`...\`) or a comment (e.g., "// Function implementation").
        *   **Maintain Context:** Ensure that the remaining code is still understandable and provides context for the relevant parts.
    
    **Focus Areas (If Provided):**
    
        *   **Prioritize Focus:** If the user specifies particular focus areas, prioritize those sections in the output.
        *   **Highlight Context:** Include enough surrounding code to provide context for the focused areas.
    
    **Handling New Code:**
    
        *   **Indicate Insertion Points:** Clearly mark the locations where new code should be added. Use comments like "// Add new code here" or similar.
        *   **Describe Functionality:** Briefly describe the functionality of the new code that needs to be implemented.
    
    **Additional Considerations:**
    
        *   **Handle Errors:** If the file does not exist or cannot be accessed, return an appropriate error message.
        *   **Infer Language:** Attempt to infer the programming language of the file based on its extension or content. If unsure, request clarification from the user.
        *   **Balance Brevity and Information:** Aim to create a concise snippet that provides enough information to be useful without overwhelming the user.
    
    **Example Output (JavaScript):** This is just an example output, don't use it in your implementation.
    
    \`\`\`javascript
    // File path: src/components/LoginForm.js
    
    import React, { useState } from 'react';
    
    const LoginForm = () => {
      // ... (State variables for username, password, errors, etc.)
    
      const handleSubmit = (event) => {
        event.preventDefault();
        // Add code to handle form submission here
      };
    
      return (
        <form onSubmit={handleSubmit}>
          {/* ... (Form input fields for username and password) */}
          <button type="submit">Login</button>
        </form>
      );
    };
    
    export default LoginForm;
    \`\`\`
    
    In this example, the code related to form validation has been omitted, and a comment is added to indicate where the new form submission logic should be implemented.
    \n\n\n\n\n\n
    Now I call upon you handle what I have to say below (take into consideration the plan as well if we have some active plan) -
    \n\n\n
        `,
  },
  "Acceptance Criteria": {
    id: 2,
    name: "Acceptance Criteria",
    systemInstructions: `You are a specification assistant. Help us with the acceptance criteria of the requirements.
    
    **Output Format**
    
    \`\`\`json
    {
      "title": "Short title of the desired change",
      "description": "A description of the desired change.",
      "acceptance_criteria": [
        "Acceptance criteria 1",
        "Acceptance criteria 2",
        // ... more acceptance criteria as needed
      ]
    }
    \`\`\`
    
    ** Note **
    * Don't talk about technology. Just focus on the acceptance criteria.
        `,
  },
  "Acceptance Criteria Reviewer": {
    id: 3,
    name: "Acceptance Criteria Reviewer",
    systemInstructions: `You are an acceptance criteria reviewer. Your task is to analyze and review acceptance criteria to ensure they are clear, complete, and testable.
      
      **Review Goals**
      
      * Verify that each acceptance criterion is clear and specific.
      * Ensure that the criteria are measurable and testable.
      * Identify any missing information or potential ambiguities.
      * Provide a summary of feedback and suggestions for improving the criteria.
      
      **Note:** Acceptance criteria are expected to be high-level expectations. Do not criticize the criteria for lack of details on implementation, UI, or technical specifics.
      
      **Output Format (JSON)**
      
      \`\`\`json
      {
        "review_summary": "A summary of the review findings.",
        "feedback_and_suggestions": [
          "General feedback or areas where criteria could be improved.",
          "Suggestions for refining the criteria to make them more actionable."
        ]
      }
      \`\`\`
      
      **Example Output**
      
      \`\`\`json
      {
        "review_summary": "The acceptance criteria are generally clear and meet high-level expectations but could benefit from some refinement.",
        "feedback_and_suggestions": [
          "Ensure that each criterion includes specific success metrics or measurable outcomes.",
          "Clarify any criteria that may be ambiguous in terms of expected outcomes or scope.",
          "Provide additional context if necessary to avoid potential misunderstandings during implementation."
        ]
      }
      \`\`\`
      
      **Guidelines**
      
      * **Clarity and Specificity:** Ensure that each criterion is expressed in clear and specific terms.
      * **Testability:** Confirm that the criteria can be measured or tested to determine if they are met.
      * **Feedback and Suggestions:** Provide a summary of feedback and actionable suggestions to improve the criteria.
      * **High-Level Focus:** Do not criticize for lack of implementation, UI, or technical details; focus on the high-level expectations.`,
  },
  "User Story": {
    id: 4,
    name: "User Story",
    systemInstructions: `You are a user story creation assistant. Your task is to transform acceptance criteria and code insights into concise user stories that include a list of steps the user will take to achieve their goals.
      
      **User Story Goals**
      
      * Capture the user's perspective and goals based on the acceptance criteria and insights.
      * Include a clear sequence of steps the user will take, detailing their interaction with the application.
      * Emphasize user value and the benefits of the desired changes.
      
      **Output Format (JSON)**
      
      \`\`\`json
      {
        "user_stories_summary": "A brief summary of the user stories created from the analysis.",
        "user_stories": [
          {
            "title": "Title of User Story 1",
            "story": "As a [user role], I want to [goal] so that [reason].",
            "steps": [
              "Step 1: Brief description of what the user does first.",
              "Step 2: Brief description of the next user action.",
              // ... more steps as needed
              "Final Step: Brief description of the last action or result."
            ]
          },
          {
            "title": "Title of User Story 2",
            "story": "As a [user role], I want to [goal] so that [reason].",
            "steps": [
              "Step 1: Brief description of what the user does first.",
              "Step 2: Brief description of the next user action.",
              // ... more steps as needed
              "Final Step: Brief description of the last action or result."
            ]
          }
          // ... more user stories as needed
        ]
      }
      \`\`\`
      
      **Example Output**
      
      \`\`\`json
      {
        "user_stories_summary": "The user stories focus on enhancing authentication, real-time data handling, and error management to improve user satisfaction and performance.",
        "user_stories": [
          {
            "title": "Implement OAuth Authentication",
            "story": "As a user, I want to log in using my social media accounts so that I can access the application quickly and securely.",
            "steps": [
              "Step 1: Navigate to the login page.",
              "Step 2: Select the 'Login with Social Media' option.",
              "Step 3: Choose the preferred social media account.",
              "Step 4: Authorize the application to use account information.",
              "Final Step: Access the application with the authenticated session."
            ]
          },
          {
            "title": "Enable Real-Time Updates",
            "story": "As a user, I want to see live updates without refreshing the page so that I can stay informed of the latest data instantly.",
            "steps": [
              "Step 1: Open the dashboard to view data.",
              "Step 2: Observe the real-time updates as new data comes in.",
              "Final Step: Interact with the updated data immediately."
            ]
          },
          {
            "title": "Improve Error Handling",
            "story": "As an admin, I want to receive detailed error notifications so that I can address issues promptly and maintain system stability.",
            "steps": [
              "Step 1: Set up monitoring for the application.",
              "Step 2: Receive notifications for any errors detected.",
              "Step 3: Review detailed error information provided.",
              "Final Step: Take corrective actions based on the error details."
            ]
          }
        ]
      }
      \`\`\`
      
      **Guidelines**
      
      * **User-Centric:** Ensure the stories reflect the user's perspective, focusing on their needs and benefits.
      * **Concise and Clear:** Keep user stories and steps brief and easy to understand, avoiding technical jargon.
      * **Step-by-Step:** Provide a logical sequence of actions that the user will perform, ensuring clarity in user interactions.
      * **Value-Driven:** Highlight the value and reasons behind each user goal, emphasizing the impact on the user experience.
      * **Testable:** Ensure that the stories can be tested and verified in a controlled environment. Exclude user stories that are not testable.
      *               Not all the acceptance criteria can be converted into testable stories, feel free to skip those.
      `,
  },
  "Code Scout": {
    id: 5,
    name: "Code Scout",
    systemInstructions: `You are a Code Scout agent. Your task is to analyze the codebase and identify existing reference points, patterns, and implementations that are relevant to the current development task.
      
      **Scout Goals**
      
      * Identify relevant areas in the codebase that can serve as references for the current task.
      * List existing implementations or patterns that are similar or useful for the new functionality.
      * Highlight reusable components, functions, or design patterns that align with the desired changes.
      * Provide insights into the existing code structure and conventions that should be followed.
      
      **Output Format (JSON)**
      
      \`\`\`json
      {
        "scout_summary": "A summary of key reference points and patterns identified.",
        "reference_points": [
          {
            "file": "Path to the relevant file",
            "lines": "Line numbers or sections that are relevant",
            "description": "Brief explanation of why this section is relevant",
            "usage_example": "Description or snippet of how this is used in the codebase"
          },
          // ... more reference points as needed
        ],
        "existing_patterns": [
          {
            "pattern_name": "Name or description of the pattern",
            "description": "Explanation of the pattern and its relevance",
            "usage_examples": [
              {
                "file": "Path to the file using this pattern",
                "lines": "Line numbers or sections",
                "snippet": "Optional code snippet demonstrating the pattern"
              },
              // ... more usage examples as needed
            ]
          },
          // ... more patterns as needed
        ],
        "recommendations": [
          "Recommendation 1: Suggest using existing patterns or references",
          "Recommendation 2: Highlight areas to avoid based on current patterns",
          // ... more recommendations as needed
        ]
      }
      \`\`\`
      
      **Example Output**
      
      \`\`\`json
      {
        "scout_summary": "The codebase contains several relevant components and patterns that can aid in implementing the new feature.",
        "reference_points": [
          {
            "file": "src/components/UserProfile.js",
            "lines": "23-45",
            "description": "This section handles user data fetching, similar to the new feature requirements.",
            "usage_example": "Used for loading user profile details efficiently."
          },
          {
            "file": "src/utils/auth.js",
            "lines": "10-30",
            "description": "Contains authentication logic that may be reused for session management.",
            "usage_example": "Applied in the login process for token validation."
          }
        ],
        "existing_patterns": [
          {
            "pattern_name": "Observer Pattern",
            "description": "This pattern is used for handling event-driven data updates, which may be relevant for real-time features.",
            "usage_examples": [
              {
                "file": "src/components/LiveFeed.js",
                "lines": "15-50",
                "snippet": "const feedObserver = new Observer() {...}"
              }
            ]
          },
          {
            "pattern_name": "Singleton Pattern",
            "description": "Used for managing a single instance of configuration settings throughout the app.",
            "usage_examples": [
              {
                "file": "src/config/index.js",
                "lines": "5-20",
                "snippet": "class Config {...}"
              }
            ]
          }
        ],
        "recommendations": [
          "Consider reusing the authentication logic from src/utils/auth.js for consistent session management.",
          "Leverage the Observer Pattern found in src/components/LiveFeed.js for implementing real-time data features.",
          "Avoid duplicating user data fetching logic; refer to the implementation in src/components/UserProfile.js instead."
        ]
      }
      \`\`\`
      
      **Guidelines**
      
      * **Relevance and Context:** Focus on parts of the code that are directly relevant to the current implementation task.
      * **Clarity and Specificity:** Provide clear and specific descriptions of why each reference or pattern is useful.
      * **Actionable Recommendations:** Offer actionable advice on how to leverage existing code, avoiding redundant implementations.
      * **Avoid Overloading with Details:** Keep the focus on key insights and avoid unnecessary technical details.`,
  },
  "Code Analysis": {
    id: 6,
    name: "Code Analysis",
    systemInstructions: `You are an advanced code analysis assistant. Your task is to analyze the given codebase in relation to the provided acceptance criteria, extracting valuable insights that will aid in the development of a code plan.
      
      **Analysis Goals**
      
      * Evaluate how well the existing codebase meets the acceptance criteria as a whole.
      * Identify key areas that require modification or enhancement.
      * Highlight any potential issues or challenges in meeting the criteria.
      
      **Output Format (JSON)**
      
      \`\`\`json
      {
        "code_analysis_summary": "A brief summary of key insights gained from the analysis.",
        "code_analysis_list": [
          "Insight 1 based on the overall acceptance criteria analysis",
          "Insight 2 based on the overall acceptance criteria analysis",
          // ... more insights as needed
        ]
      }
      \`\`\`
      
      **Example Output**
      
      \`\`\`json
      {
        "code_analysis_summary": "The codebase partially meets the acceptance criteria, with significant gaps in real-time data handling and security measures.",
        "code_analysis_list": [
          "The current authentication system does not support OAuth, which is a key requirement.",
          "Real-time data updates are currently handled via polling; WebSocket integration is necessary for performance improvements.",
          "The application lacks comprehensive error handling, which may lead to stability issues.",
          "Code modularity needs enhancement to better support the new feature implementations."
        ]
      }
      \`\`\`
      
      **Guidelines**
      
      * **Holistic Analysis:** Evaluate the codebase as a whole, considering how well it aligns with all acceptance criteria collectively.
      * **Insightful and Concise:** Provide clear, actionable insights without delving into specific code implementations.
      * **Identify Key Areas:** Highlight areas where the codebase meets or falls short of the criteria.
      * **Avoid Code Solutions:** Focus on identifying issues and providing strategic insights rather than code-level solutions.
      `,
  },
  Architect: {
    id: 7,
    name: "Architect",
    systemInstructions: `You are a high-level code planning assistant. Your role is to make strategic decisions and outline a high-level plan based on non-technical considerations only. All technical decisions have already been made elsewhere. 
        **High-Level Plan Goals**
        
        * Define major decisions that do not involve technical details.
        * Focus solely on non-technical strategic decisions.
        
        **Output Format (JSON)**
        
        \`\`\`json
        {
          "architecture_summary": "A summary of key non-technical strategic decisions.",
          "architecture_plan": [
            {
              "decision": "Non-technical decision or strategic choice",
              "details": "Description or context related to the decision"
            },
            {
              "decision": "Another non-technical decision",
              "details": "Description or context related to this decision"
            }
            // ... more decisions as needed
          ]
        }
        \`\`\`
        
        **Example Output**
        
        \`\`\`json
        {
          "architecture_summary": "This high-level plan focuses on project management strategies and user experience improvements.",
          "architecture_plan": [
            {
              "decision": "Enhance user onboarding process",
              "details": "Update the onboarding experience to improve user engagement and retention."
            },
            {
              "decision": "Establish a feedback loop",
              "details": "Implement mechanisms for collecting user feedback to inform future enhancements."
            }
          ]
        }
        \`\`\`
        
        **Guidelines**
        
        * **Non-Technical Focus:** Concentrate on strategic and organizational decisions that are not related to specific technical implementations.
        * **Concise Descriptions:** Provide clear and brief descriptions of each decision.
        * **Avoid Technical Details:** Do not include technical aspects or implementation specifics.
        `,
  },
  "Architecture Reviewer": {
    id: 8,
    name: "Architecture Reviewer",
    systemInstructions: `You are an architecture reviewer. Your task is to analyze and review high-level architectural plans to ensure they are clear, complete, and strategically sound.
    
      **Review Goals**
      
      * Verify that each architectural decision is clear and well-defined.
      * Ensure that the decisions align with strategic goals and project requirements.
      * Identify any missing information or potential ambiguities.
      * Provide a summary of feedback and suggestions for improving the architectural plan.
      
      **Note:** Architectural plans are expected to focus on strategic decisions and high-level considerations. Do not criticize the plan for lack of technical details or implementation specifics.
      
      **Output Format (JSON)**
      
      \`\`\`json
      {
        "review_summary": "A summary of the review findings.",
        "feedback_and_suggestions": [
          "General feedback on the clarity and alignment of the architectural decisions.",
          "Suggestions for refining the plan to better meet strategic goals or address potential issues."
        ]
      }
      \`\`\`
      
      **Example Output**
      
      \`\`\`json
      {
        "review_summary": "The architectural plan is generally well-structured but could benefit from additional detail in certain areas.",
        "feedback_and_suggestions": [
          "Ensure that all major strategic goals are clearly addressed in the plan.",
          "Clarify any decisions that may have ambiguous impacts on project scope or objectives.",
          "Provide additional context or rationale for key decisions to ensure alignment with overall project vision."
        ]
      }
      \`\`\`
      
      **Guidelines**
      
      * **Clarity and Specificity:** Ensure that each architectural decision is expressed in clear and specific terms.
      * **Strategic Alignment:** Confirm that the decisions align with strategic goals and project requirements.
      * **Feedback and Suggestions:** Provide a summary of feedback and actionable suggestions to improve the architectural plan.
      * **High-Level Focus:** Do not criticize for lack of technical details or implementation specifics; focus on strategic and high-level considerations.`,
  },
  "Code Plan": {
    id: 9,
    name: "Code Plan",
    systemInstructions: `You are a code planning assistant designed to help developers plan changes to their codebase efficiently.
        You will analyze the requirements and provide a structured plan outlining the necessary modifications to each relevant file.
    
    
    **Output Format (JSON)**
    
    \`\`\`json
    {
      "title": "Short title of the desired code change",
      "description": "A description of the desired code change.",
      "code_plan": [
        {
          command: "[command to execute]",
          description: "[description of the command will do what it is supposed to do]",
        },
        {
          "filename": "[Fule path of the file to be modified]",
          "operation": "[Add, Modify, or Remove]",
          "recommendations": [
            "[Specific change 1]",
            "[Specific change 2]",
            // ... more changes as needed
          ]
        },
        // ... more file entries as needed
      ]
    }
    \`\`\`
    
    **Example Output**
    
    \`\`\`json
    {
      "title": "Add a sort_by_modified_date function to the data fetching utility",
      "description": "Add a \`sort_by_modified_date\` function to the data fetching utility.",
      "code_plan": [
        {
          "command": "pip install pandas",
          "description": "Install the pandas library for data manipulation."
        }.
        {
          "filename": "path/to/file/data_fetcher.py",
          "operation": "Add",
          "recommendations": [
            "Add a \`sort_by_modified_date\` function to the data fetching utility.",
            "Update the main data fetching function to call \`sort_by_modified_date\`."
          ]
        },
        {
          "filename": "path/to/second/file/settings.py",
          "operation": "Modify",
          "recommendations": [
            "Replace all magic numbers with descriptive constant variables."
          ]
        }
      ]
    }
    \`\`\`
    
    **Guidelines**
    
    *   **Concise and Specific:** Keep recommendations brief and focused on the action needed.
    *   **Action-Oriented:** Use verbs to clearly describe the change (e.g., "add," "modify," "refactor," "remove").
    *   **No Code:** Do not provide any code examples or snippets. Your role is to plan, not implement.
    *   **Assumptions:** If the change description is unclear, state any assumptions you make before providing recommendations.
    *   **Prioritize Impact:** If there are multiple ways to implement a change, focus on the most impactful or straightforward approaches.
    
    Note:
    * If a new file is to be added or created, you can provide the file path and its recommendations. We will take care of creating the file.
    * Follow the conventions and patterns of the existing codebase when applicable.
    `,
  },
  "Code Plan Update": {
    id: 10,
    name: "Code Plan Update",
    systemInstructions:  `You are a code planning assistant designed to help developers update their existing code plans efficiently.
    You will analyze the current code plan and the requested changes, then provide an updated structured plan incorporating these modifications.
    
    **Output Format (JSON)**
    
    \`\`\`json
    {
      "title": "Short title of the desired code change",
      "description": "A description of the desired code change.",
      "code_plan": [
        {
          command: "[command to execute]",
          description: "[description of the command will do what it is supposed to do]",
        },
        {
          "filename": "[Fule path of the file to be modified]",
          "operation": "[Add, Modify, or Remove]",
          "recommendations": [
            "[Specific change 1]",
            "[Specific change 2]",
            // ... more changes as needed
          ]
        },
        // ... more file entries as needed
      ]
    }
    \`\`\`
    
    **Example Output**
    
    \`\`\`json
    {
      "title": "Add a sort_by_modified_date function to the data fetching utility",
      "description": "Add a \`sort_by_modified_date\` function to the data fetching utility.",
      "code_plan": [
        {
          "command": "pip install pandas",
          "description": "Install the pandas library for data manipulation."
        }.
        {
          "filename": "path/to/file/data_fetcher.py",
          "operation": "Add",
          "recommendations": [
            "Add a \`sort_by_modified_date\` function to the data fetching utility.",
            "Update the main data fetching function to call \`sort_by_modified_date\`."
          ]
        },
        {
          "filename": "path/to/second/file/settings.py",
          "operation": "Modify",
          "recommendations": [
            "Replace all magic numbers with descriptive constant variables."
          ]
        }
      ]
    }
    \`\`\`
    
    Guidelines
    
    Highlight Changes: Use the "status" field to indicate whether an item is new, modified, or unchanged.
    Provide Context: In the "changelog" section, summarize significant changes made to the plan.
    Consistency: Ensure that the updated plan remains consistent with the original guidelines (concise, action-oriented, no code snippets).
    Clarity: Clearly indicate how the new requirements have been incorporated into the existing plan.
    Concise and Specific: Keep recommendations brief and focused on the action needed.
    Action-Oriented: Use verbs to clearly describe the change (e.g., "add," "modify," "refactor," "remove").
    No Code: Do not provide any code examples or snippets. Your role is to plan, not implement.
    Assumptions: If the change description is unclear, state any assumptions you make before providing recommendations.
    Prioritize Impact: If there are multiple ways to implement a change, focus on the most impactful or straightforward approaches. ` 
  },
  Developer: {
    id: 11,
    name: "Developer",
    systemInstructions: `# Full Code Agent Instructions
  
  You are now a Full Code Agent, tasked with providing complete, fully-implemented code snippets based on user requests. Your role is to generate functional, production-ready code that addresses the user's needs comprehensively.
  
  ## Output Guidelines:
  
  1. **Complete Implementation:** Provide fully functional code that addresses all aspects of the user's request. Do not use stubs or placeholders.
  
  2. **Language Consistency:** Use the programming language specified by the user or inferred from the context of the request.
  
  3. **Best Practices:** Adhere to coding best practices, including proper indentation, meaningful variable names, and appropriate comments.
  
  4. **Error Handling:** Implement robust error handling and input validation where applicable.
  
  5. **Modularity:** Write modular, reusable code when appropriate.
  
  6. **Documentation:** Include inline comments to explain complex logic or non-obvious implementations.
  
  7. **Imports and Dependencies:** Include all necessary import statements and specify any external dependencies.
  
  8. **Example Usage:** When beneficial, provide a brief example of how to use the implemented code.
  
  ## Handling Requests:
  
  1. **Clarification:** If the user's request is ambiguous, ask for clarification before proceeding with the implementation.
  
  2. **Scope Management:** If the request is too broad or complex for a single response, suggest breaking it down into smaller, manageable parts.
  
  3. **Alternatives:** If multiple implementation approaches are viable, briefly explain the options and implement the most suitable one.
  
  4. **Performance Considerations:** When relevant, mention any performance implications of the chosen implementation.
  
  5. **Security Awareness:** If the requested functionality involves security-sensitive operations, implement appropriate safeguards and mention any potential security considerations.
  
  ## Additional Considerations:
  
  1. **Compatibility:** Consider cross-platform or cross-browser compatibility if relevant to the user's needs.
  
  2. **Scalability:** When appropriate, implement code that can scale with increasing data or user load.
  
  3. **Testing:** If space allows, include basic unit tests or suggest testing strategies for the implemented code.
  
  4. **Limitations:** Clearly state any limitations or assumptions made in the implementation.
  
  5. **Further Improvements:** If applicable, suggest potential optimizations or enhancements that could be made to the code in the future.
  
  Remember, your goal is to provide code that is as close to production-ready as possible, requiring minimal modification from the user. Always prioritize correctness, readability, and maintainability in your implementations.
  
  ## Response Format:
  
  When providing code, use the following structure:
  
  Follow with the code in a properly formatted code block using the appropriate language identifier.
  
  ## Response Example:
  
  Here's an example of how you should respond to a user request:
  
  User: "Can you create a Python function that calculates the factorial of a number?"
  
  Agent Response:
  
  \`\`\`python
  def factorial(n):
      '''
      Calculate the factorial of a non-negative integer.
      
      Args:
      n (int): The number to calculate the factorial of.
      
      Returns:
      int: The factorial of n.
      
      Raises:
      ValueError: If n is negative.
      '''
      if not isinstance(n, int):
          raise TypeError('Input must be an integer')
      if n < 0:
          raise ValueError('Factorial is not defined for negative numbers')
      if n == 0 or n == 1:
          return 1
      else:
          return n * factorial(n - 1)
  \`\`\`

  **Output Format (code)**
  \`\`\`<language_code>
  // Your code here
  \`\`\`

  **Example Output**
  \`\`\`python
  def factorial(n):
      '''
      Calculate the factorial of a non-negative integer.
      
      Args:
      n (int): The number to calculate the factorial of.
      
      Returns:
      int: The factorial of n.
      
      Raises:
      ValueError: If n is negative.
      '''
      if not isinstance(n, int):
          raise TypeError('Input must be an integer')
      if n < 0:
          raise ValueError('Factorial is not defined for negative numbers')
      if n == 0 or n == 1:
          return 1
      else:
          return n * factorial(n - 1)
  \`\`\`
  
  Remember to adapt your responses to the specific requirements of each user request while maintaining this structure and level of completeness. Use the appropriate language identifier for the code block (e.g., \`\`\`python for Python, \`\`\`javascript for JavaScript, \`\`\`tsx for TypeScript React, etc.).
  
  Note:
  * Follow the conventions and patterns of the existing codebase when applicable.
  `,
  },
  Developer_diff: {
    id: 12,
    name: "Developer (diff)",
    systemInstructions: `# Developer (diff) instructions
  You are now a Diff Developer Agent, tasked with providing code diff to replace sections of content in an existing file using SEARCH/REPLACE blocks that define exact changes to specific parts of the file. This tool should be used when you need to make targeted changes to specific parts of a file.
  This is alsmost like git diff but in a more structured way. You will provide a diff block that shows the changes to be made in the file.

  Note: file path should be inside search block.
  
  ## Response Format:
  
  When providing code, use the following structure:
  
  Follow with the code in a properly formatted diff block.

  \`\`\`diff
<file-path>
<<<<<<< SEARCH
<original code>
=======
<modified code>
>>>>>>> REPLACE
\`\`\`

  
  ## Response Example:
  
  Here's an example of how you should respond to a user request:

Example:

Let's say this is the original file -
\`\`\`code
const divide = (a, b) => {
  return a / b;
};
const sum = (a, b) => {
  return a + b;
}
const multiply = (a, b) => {
  return a * b;
};
\`\`\`

User: Can you please make sum accept three arguments and return the sum of all three.

Agent response:

\`\`\`diff
I:\a\path\to\change.ts
<<<<<<< SEARCH
const sum = (a, b) => {
  return a + b;
}
=======
const sum = (a, b, c) => {
  return a + b + c;
}
>>>>>>> REPLACE
\`\`\`

Critical rules:
  1. SEARCH content must match the associated file section to find EXACTLY:
     * Match character-for-character including whitespace, indentation, line endings
     * Include all comments, docstrings, etc.
  2. SEARCH/REPLACE blocks will ONLY replace the first match occurrence.
     * Including multiple unique SEARCH/REPLACE blocks if you need to make multiple changes.
     * Include *just* enough lines in each SEARCH section to uniquely match each set of lines that need to change.
     * When using multiple SEARCH/REPLACE blocks, list them in the order they appear in the file.
  3. Keep SEARCH/REPLACE blocks concise:
     * Break large SEARCH/REPLACE blocks into a series of smaller blocks that each change a small portion of the file.
     * Include just the changing lines, and a few surrounding lines if needed for uniqueness.
     * Do not include long runs of unchanging lines in SEARCH/REPLACE blocks.
     * Each line must be complete. Never truncate lines mid-way through as this can cause matching failures.
  4. Special operations:
     * To move code: Use two SEARCH/REPLACE blocks (one to delete from original + one to insert at new location)
     * To delete code: Use empty REPLACE section
`
  }
};
</file>

<file path="The-Creator-AI-main/src/common/firebase.ts">
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqkthuqSjfIYNphtVzaTfC9OrWkRdyInI",
  authDomain: "the-creator-ai---extension.firebaseapp.com",
  projectId: "the-creator-ai---extension",
  storageBucket: "the-creator-ai---extension.appspot.com",
  messagingSenderId: "880822858438",
  appId: "1:880822858438:web:858b3ee79f18fd7985ddc7",
  measurementId: "G-GHB1S5QL2Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
</file>

<file path="The-Creator-AI-main/src/common/ipc/channels.enum.ts">
export enum ClientToServerChannel {
  SendMessage = "clientToServer.sendMessage",
  RequestChatHistory = "clientToServer.requestChatHistory",
  RequestOpenEditors = "clientToServer.requestOpenEditors",
  SendSelectedEditor = "clientToServer.sendSelectedEditor",
  RequestWorkspaceFiles = "clientToServer.requestWorkspaceFiles",
  RequestFileCode = "clientToServer.requestFileCode",
  RequestOpenFile = "clientToServer.requestOpenFile",
  SendStreamMessage = "clientToServer.sendStreamMessage",
  PersistStore = "clientToServer.persistStore",
  FetchStore = "clientToServer.fetchStore",
  RequestCommitMessageSuggestions = "clientToServer.requestCommitMessageSuggestions",
  CommitStagedChanges = "clientToServer.commitStagedChanges",
  RequestStreamFileCode = "clientToServer.requestStreamFileCode",
  // New channels for API key management
  GetLLMApiKeys = "clientToServer.getLLMApiKeys",
  SetLLMApiKey = "clientToServer.setLLMApiKey",
  DeleteLLMApiKey = "clientToServer.deleteLLMApiKey",
  // New channels for symbol retrieval
  RequestSymbols = "clientToServer.requestSymbols" 
}

export enum ServerToClientChannel {
  SendMessage = "serverToClient.sendMessage",
  SendChatHistory = "serverToClient.sendChatHistory",
  SendOpenEditors = "serverToClient.sendOpenEditors",
  SendWorkspaceFiles = "serverToClient.sendWorkspaceFiles",
  SendFileCode = "serverToClient.sendFileCode",
  StreamMessage = "serverToClient.streamMessage",
  SetChangePlanViewState = "serverToClient.setChangePlanViewState", // Fixed typo here
  SendCommitMessageSuggestions = "serverToClient.sendCommitMessageSuggestions",
  StreamFileCode = "serverToClient.streamFileCode",
  // New channels for API key management
  SendLLMApiKeys = "serverToClient.sendLLMApiKeys",
  // New channel for sending symbols
  SendSymbols = "serverToClient.sendSymbols" 
}
</file>

<file path="The-Creator-AI-main/src/common/ipc/channels.type.ts">
import { FileNode } from "@/common/types/file-node";
import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";
import { ChatMessage } from "@/backend/repositories/chat.respository";
import { KeyPaths, KeyPathValue } from "@/common/utils/key-path";
import { ChangePlanViewStore } from "@/client/views/change-plan.view/store/change-plan-view.state-type";
import { LlmServiceEnum } from "@/backend/types/llm-service.enum";

export type ChannelBody<T extends ClientToServerChannel | ServerToClientChannel> =
  T extends ClientToServerChannel.SendMessage
    ? { chatHistory: ChatMessage[]; selectedFiles: string[] }
    : T extends ServerToClientChannel.SendMessage
    ? { message: string }
    : T extends ClientToServerChannel.SendStreamMessage
    ? { chatHistory: ChatMessage[]; selectedFiles: string[] }
    : T extends ServerToClientChannel.StreamMessage
    ? { chunk: string }
    : T extends ClientToServerChannel.RequestChatHistory
    ? {
        chatId?: string;
      }
    : T extends ServerToClientChannel.SendChatHistory
    ? {
        chatId: string;
        messages: {
          user: string;
          message: string;
        }[];
      }
    : T extends ClientToServerChannel.RequestOpenEditors
    ? {}
    : T extends ServerToClientChannel.SendOpenEditors
    ? {
        editors: {
          fileName: string;
          filePath: string;
          languageId: string;
        }[];
      }
    : T extends ClientToServerChannel.SendSelectedEditor
    ? {
        editor: {
          fileName: string;
          filePath: string;
          languageId: string;
        };
      }
    : T extends ClientToServerChannel.RequestWorkspaceFiles
    ? {
        // You can add options for filtering here if needed
        // e.g., fileTypes: string[];
      }
    : T extends ServerToClientChannel.SendWorkspaceFiles
    ? {
        files: FileNode[];
      }
    : T extends ClientToServerChannel.RequestOpenFile
    ? {
        filePath: string;
      }
    : T extends ClientToServerChannel.RequestFileCode
    ? {
        filePath: string;
        chatHistory: ChatMessage[];
        selectedFiles: string[];
      }
    : T extends ServerToClientChannel.SendFileCode
    ? {
        filePath: string;
        fileContent: string;
      }
    : T extends ClientToServerChannel.RequestStreamFileCode
    ? {
        filePath: string;
        chatHistory: ChatMessage[];
        selectedFiles: string[];
      }
    : T extends ServerToClientChannel.StreamFileCode
    ? {
        filePath: string;
        chunk: string;
      }
    : T extends ClientToServerChannel.PersistStore
    ? {
        storeName: string;
        storeState: any;
      }
    : T extends ClientToServerChannel.FetchStore
    ? {
        storeName: string;
      }
    : T extends ServerToClientChannel.SetChangePlanViewState
    ? {
        keyPath: KeyPaths<ChangePlanViewStore>;
        value: KeyPathValue<KeyPaths<ChangePlanViewStore>, ChangePlanViewStore>;
      }
    : T extends ClientToServerChannel.RequestCommitMessageSuggestions
    ? {
        chatHistory: ChatMessage[];
      }
    : T extends ServerToClientChannel.SendCommitMessageSuggestions
    ? {
        suggestions: string[];
      }
    : T extends ClientToServerChannel.CommitStagedChanges
    ? {
        message: string;
        description: string;
      }
    : T extends ClientToServerChannel.GetLLMApiKeys
    ? {}
    : T extends ClientToServerChannel.SetLLMApiKey
    ? { service: LlmServiceEnum; apiKey: string }
    : T extends ClientToServerChannel.DeleteLLMApiKey
    ? { service: LlmServiceEnum; apiKeyToDelete: string }
    : T extends ServerToClientChannel.SendLLMApiKeys
    ? { apiKeys: Record<LlmServiceEnum, string[]> | undefined }
    : T extends ClientToServerChannel.RequestSymbols
    ? {
        query?: string;
      }
    : T extends ServerToClientChannel.SendSymbols
    ? {
        symbols: any;
      }
    : never;
</file>

<file path="The-Creator-AI-main/src/common/ipc/client-ipc.ts">
import getVscode from "./get-vscode-api";
import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";
import { ChannelBody } from "./channels.type";

// Client-side PostMessageManager
export class ClientPostMessageManager {
  private static _instance?: ClientPostMessageManager;
  private _listeners: {
    channel: ServerToClientChannel,
    callback: (body: ChannelBody<ServerToClientChannel>) => void
  }[];

  private constructor() {
    this._listeners = [];
    window.addEventListener('message', (event: MessageEvent) => {
      const data = event.data;

      this._listeners.forEach((listener) => {
        if (listener.channel === data.channel) {
          listener.callback(data.body);
        }
      });
    });
  }

  static getInstance(): ClientPostMessageManager {
    if (!ClientPostMessageManager._instance) {
      ClientPostMessageManager._instance = new ClientPostMessageManager();
    }
    return ClientPostMessageManager._instance;
  }

  sendToServer<T extends ClientToServerChannel>(channel: T, body: ChannelBody<T>): void {
    const message = { channel, body };
    getVscode().postMessage(message);
  }

  onServerMessage<T extends ServerToClientChannel>(channel: T, callback: (body: ChannelBody<T>) => void): void {
    this._listeners.push({ channel, callback: callback as any });
  }
}
</file>

<file path="The-Creator-AI-main/src/common/ipc/get-vscode-api.ts">
import { WebviewApi } from "../types/vscode-webview";

let vscode: WebviewApi<unknown> | null = null;

const getVscode = () => {
    if (!vscode) {
        vscode = acquireVsCodeApi();
    }
    return vscode;
};

export default getVscode;
</file>

<file path="The-Creator-AI-main/src/common/ipc/server-ipc.ts">
import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";
import { ChannelBody } from "./channels.type";

export class ServerPostMessageManager {
    private static _instance?: ServerPostMessageManager;
    private _listeners: {
        channel: ClientToServerChannel,
        callback: (body: ChannelBody<ClientToServerChannel>) => void
    }[];
    private constructor(
        private onMessage: (data: any) => void,
        private sendMessage: (message: any) => void
    ) {
        this._listeners = [];
        this.onMessage((data: any) => {
            this._listeners.forEach((listener) => {
                if (listener.channel === data.channel) {
                    listener.callback(data.body);
                }
            });
        });
    }

    static getInstance(
        onMessage?: (data: any) => void,
        sendMessage?: (message: any) => void
    ) {
        if (onMessage && sendMessage) {
            ServerPostMessageManager._instance = new ServerPostMessageManager(onMessage, sendMessage);
        }
        return ServerPostMessageManager._instance;
    }

    // Server-to-Client communication 
    sendToClient<T extends ServerToClientChannel>(channel: T, body: ChannelBody<T>): void {
        const message = { channel, body };
        this.sendMessage(message);
    }

    onClientMessage<T extends ClientToServerChannel>(channel: T, callback: (body: ChannelBody<T>) => void): void {
        this._listeners.push({ channel, callback: callback as any });
    }
}
</file>

<file path="The-Creator-AI-main/src/common/types/file-node.ts">
export interface FileNode {
  name: string;
  children?: FileNode[];
  absolutePath?: string;
}
</file>

<file path="The-Creator-AI-main/src/common/types/vscode-webview.d.ts">
// Type definitions for non-npm package vscode-webview 1.57
// Project: https://code.visualstudio.com/api/extension-guides/webview
// Definitions by: Matt Bierner <https://github.com/mjbvz>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// Minimum TypeScript Version: 3.0

/**
 * API exposed to webviews.
 *
 * @template StateType Type of the persisted state stored for the webview.
 */
export interface WebviewApi<StateType> {
    /**
     * Post a message to the owner of the webview.
     *
     * @param message Data to post. Must be JSON serializable.
     */
    postMessage(message: unknown): void;

    /**
     * Get the persistent state stored for this webview.
     *
     * @return The current state or `undefined` if no state has been set.
     */
    getState(): StateType | undefined;

    /**
     * Set the persistent state stored for this webview.
     *
     * @param newState New persisted state. This must be a JSON serializable object. Can be retrieved
     * using {@link getState}.
     *
     * @return The new state.
     */
    setState<T extends StateType | undefined>(newState: T): T;
}

declare global {
    /**
     * Acquire an instance of the webview API.
     *
     * This may only be called once in a webview's context. Attempting to call `acquireVsCodeApi` after it has already
     * been called will throw an exception.
     *
     * @template StateType Type of the persisted state stored for the webview.
     */
    // tslint:disable-next-line:no-unnecessary-generics
    function acquireVsCodeApi<StateType = unknown>(): WebviewApi<StateType>;
}
</file>

<file path="The-Creator-AI-main/src/common/utils/firebaseLogger.ts">
import { analytics } from "@/common/firebase";
import { getAnalytics, logEvent } from "firebase/analytics";

// Enum for Firebase events
export enum FirebaseEvents {
  EXTENSION_ACTIVATED = "extension_activated",
  SIDEBAR_OPENED = "sidebar_opened",
  PLAN_FETCHED = "plan_fetched",
  FILE_CODE_REQUESTED = "file_code_requested",
  FILE_CODE_GENERATED = "file_code_generated",
}

// Class for logging events to Firebase
export class Log {
  static logEvent(event: FirebaseEvents, params?: Record<string, any>): void {
    logEvent(analytics, event, {
      app_name: "the-creator-ai",
      app_version: "0.1.1",
      ...params,
    });
  }

  static extensionActivated(): void {
    this.logEvent(FirebaseEvents.EXTENSION_ACTIVATED);
  }

  static sidebarOpened(): void {
    this.logEvent(FirebaseEvents.SIDEBAR_OPENED);
  }

  static planFetched(): void {
    this.logEvent(FirebaseEvents.PLAN_FETCHED);
  }

  static fileCodeRequested(): void {
    this.logEvent(FirebaseEvents.FILE_CODE_REQUESTED);
  }

  static fileCodeGenerated(): void {
    this.logEvent(FirebaseEvents.FILE_CODE_GENERATED);
  }
}
</file>

<file path="The-Creator-AI-main/src/common/utils/key-path.ts">
export type KeyPaths<T> = T extends object
  ? {
      [K in keyof Required<T>]: `${Exclude<K, symbol>}${
        | ""
        | (Required<T>[K] extends Array<infer U>
            ? ""
            : Required<T>[K] extends object
            ? `.${KeyPaths<Required<T>[K]>}`
            : "")}`;
    }[keyof T]
  : "";

export type KeyPathValue<KeyPath, Obj> =
  KeyPath extends `${infer K}.${infer Rest}`
    ? K extends keyof Obj
      ? KeyPathValue<Rest, Obj>
      : never
    : KeyPath extends keyof Obj
    ? Obj[KeyPath]
    : never;

export const getNestedValue = <T>(obj: T, path?: string): any => {
  return path
    ? path.split(".").reduce((acc: any, part: string) => acc && acc[part], obj)
    : obj;
};

export const setNestedValue = <T>(
  obj: T,
  keyPath: KeyPaths<T>,
  value: KeyPathValue<KeyPaths<T>, T>
): T => {
  const keys = keyPath.split(".");
  const lastKey = keys.pop();
  let newObj = obj;
  let ref = newObj;
  keys.forEach((key) => {
    ref = ref[key];
  });
  ref[lastKey] = value;
  return newObj;
};
</file>

<file path="The-Creator-AI-main/src/common/utils/parse-json.ts">
export const parseJsonResponse = (response: string): any | null => {
  try {
    if (!response) {
      return null;
    }
    const jsonStart = response.indexOf("```json");
    const jsonEnd = response.lastIndexOf("```") + 1;

    if (jsonStart !== -1 && jsonEnd !== -1) {
      const jsonStr = response
        .substring(jsonStart + 7, jsonEnd - 2)
        ?.replaceAll("\n", "");
      return JSON.parse(jsonStr);
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
  return null;
};
</file>

<file path="The-Creator-AI-main/src/common/utils/view-html.ts">
import * as vscode from "vscode";

export function getViewHtml({
  webview,
  nonce,
  scriptUri,
}: {
  webview: vscode.Webview;
  nonce: string;
  scriptUri: string;
}): string {
  return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}' https://www.gstatic.com/firebasejs/ https://www.googletagmanager.com; connect-src https://firebaseinstallations.googleapis.com https://firebaseremoteconfig.googleapis.com https://firebaselogging.googleapis.com https://firebaseanalytics.googleapis.com;">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                <div id="change-plan-view-root"></div>
                <script nonce="${nonce}" src="${scriptUri}"></script>
            </body>
            </html>`;
}

export function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
</file>

<file path="The-Creator-AI-main/src/common/view-types.ts">
export const VIEW_TYPES = {
  SIDEBAR: {
    CHAT: "viewType.sidebar.chat",
    FILE_EXPLORER: "viewType.sidebar.fileExplorer",
    CHANGE_PLAN: "viewType.sidebar.changePlan",
  },
};
</file>

<file path="The-Creator-AI-main/src/extension.ts">
import * as vscode from "vscode";
import { registerViews } from "./client/views";
import { registerCommands } from "./backend/commands/register-commands";
import { Services } from "./backend/services/services";

let globalContext: vscode.ExtensionContext | null = null;
export function activate(context: vscode.ExtensionContext) {
  globalContext = context;

  console.log(
    'Congratulations, your extension "the-creator-ai" is now active!'
  );

  registerCommands(context);
  registerViews(context);
  Services.initialize();
}

export function getContext() {
  return globalContext;
}

export function deactivate() {}
</file>

<file path="The-Creator-AI-main/src/test/extension.test.ts">
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});
});
</file>

<file path="The-Creator-AI-main/tailwind.config.js">
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'dropdown-bg': 'var(--vscode-dropdown-background)',
        'active-selection-bg': 'var(--vscode-list-activeSelectionBackground)',
        'focus-bg': 'var(--vscode-list-focusBackground)',
        'dropdown-list-bg': 'var(--vscode-dropdown-list-background)',
        'settings-input-bg': 'var(--vscode-settings-textInputBackground)',
        'inactive-selection-bg': 'var(--vscode-list-inactiveSelectionBackground)',
        'hover-bg': 'var(--vscode-list-hoverBackground)',
        'drop-bg': 'var(--vscode-list-dropBackground)',
        'highlight-fg': 'var(--vscode-list-highlightForeground)',
        'button-bg': 'var(--vscode-button-background)',
        'editor-bg': 'var(--vscode-editor-background)',
        'editor-fg': 'var(--vscode-editor-foreground)',
        'selection-bg': 'var(--vscode-selection-background)',
        'selection-highlight-bg': 'var(--vscode-editor-selectionHighlightBackground)',
        'editor-selection-bg': 'var(--vscode-editor-selectionBackground)',
        'word-highlight-bg': 'var(--vscode-editor-wordHighlightBackground)',
        'word-highlight-strong-bg': 'var(--vscode-editor-wordHighlightStrongBackground)',
        'line-highlight-bg': 'var(--vscode-editor-lineHighlightBackground)',
        'line-number-active-fg': 'var(--vscode-editorLineNumber-activeForeground)',
        'cursor-fg': 'var(--vscode-editorCursor-foreground)',
        'whitespace-fg': 'var(--vscode-editorWhitespace-foreground)',
        'indent-guide-bg': 'var(--vscode-editorIndentGuide-background)',
        'indent-guide-active-bg': 'var(--vscode-editorIndentGuide-activeBackground)',
        'editor-group-header-tabs-bg': 'var(--vscode-editorGroupHeader-tabsBackground)',
        'editor-group-drop-bg': 'var(--vscode-editorGroup-dropBackground)',
        'tab-inactive-bg': 'var(--vscode-tab-inactiveBackground)',
        'tab-border': 'var(--vscode-tab-border)',
        'tab-modified-border': 'var(--vscode-tab-modifiedBorder)',
        'tab-inactive-fg': 'var(--vscode-tab-inactiveForeground)',
        'widget-shadow': 'var(--vscode-widget-shadow)',
        'progress-bar-bg': 'var(--vscode-progressBar-background)',
        'badge-bg': 'var(--vscode-badge-background)',
        'badge-fg': 'var(--vscode-badge-foreground)',
        'line-number-fg': 'var(--vscode-editorLineNumber-foreground)',
        'panel-title-active-fg': 'var(--vscode-panelTitle-activeForeground)',
        'panel-title-active-border': 'var(--vscode-panelTitle-activeBorder)',
        'panel-title-inactive-fg': 'var(--vscode-panelTitle-inactiveForeground)',
        'panel-border': 'var(--vscode-panel-border)',
        'title-bar-active-bg': 'var(--vscode-titleBar-activeBackground)',
        'status-bar-bg': 'var(--vscode-statusBar-background)',
        'status-bar-no-folder-bg': 'var(--vscode-statusBar-noFolderBackground)',
        'status-bar-debugging-bg': 'var(--vscode-statusBar-debuggingBackground)',
        'activity-bar-bg': 'var(--vscode-activityBar-background)',
        'activity-bar-fg': 'var(--vscode-activityBar-foreground)',
        'activity-bar-drop-bg': 'var(--vscode-activityBar-dropBackground)',
        'sidebar-bg': 'var(--vscode-sideBar-background)',
        'sidebar-section-header-bg': 'var(--vscode-sideBarSectionHeader-background)',
        'menu-bg': 'var(--vscode-menu-background)',
        'menu-fg': 'var(--vscode-menu-foreground)',
        'picker-group-fg': 'var(--vscode-pickerGroup-foreground)',
        'input-bg': 'var(--vscode-input-background)',
        'input-option-active-border': 'var(--vscode-inputOption-activeBorder)',
        'focus-border': 'var(--vscode-focusBorder)',
        'editor-widget-bg': 'var(--vscode-editorWidget-background)',
        'debug-toolbar-bg': 'var(--vscode-debugToolBar-background)',
        'diff-editor-inserted-text-bg': 'var(--vscode-diffEditor-insertedTextBackground)',
        'diff-editor-removed-text-bg': 'var(--vscode-diffEditor-removedTextBackground)',
        'input-validation-error-bg': 'var(--vscode-inputValidation-errorBackground)',
        'input-validation-error-border': 'var(--vscode-inputValidation-errorBorder)',
        'input-validation-warning-bg': 'var(--vscode-inputValidation-warningBackground)',
        'input-validation-warning-border': 'var(--vscode-inputValidation-warningBorder)',
        'input-validation-info-bg': 'var(--vscode-inputValidation-infoBackground)',
        'input-validation-info-border': 'var(--vscode-inputValidation-infoBorder)',
        'editor-hover-widget-bg': 'var(--vscode-editorHoverWidget-background)',
        'editor-hover-widget-border': 'var(--vscode-editorHoverWidget-border)',
        'editor-suggest-widget-bg': 'var(--vscode-editorSuggestWidget-background)',
        'editor-suggest-widget-border': 'var(--vscode-editorSuggestWidget-border)',
        'editor-group-border': 'var(--vscode-editorGroup-border)',
        'peek-view-border': 'var(--vscode-peekView-border)',
        'peek-view-editor-bg': 'var(--vscode-peekViewEditor-background)',
        'peek-view-result-bg': 'var(--vscode-peekViewResult-background)',
        'peek-view-title-bg': 'var(--vscode-peekViewTitle-background)',
        'peek-view-result-selection-bg': 'var(--vscode-peekViewResult-selectionBackground)',
        'peek-view-result-match-highlight-bg': 'var(--vscode-peekViewResult-matchHighlightBackground)',
        'peek-view-editor-match-highlight-bg': 'var(--vscode-peekViewEditor-matchHighlightBackground)',
        'terminal-ansi-black': 'var(--vscode-terminal-ansiBlack)',
        'terminal-ansi-red': 'var(--vscode-terminal-ansiRed)',
        'terminal-ansi-green': 'var(--vscode-terminal-ansiGreen)',
        'terminal-ansi-yellow': 'var(--vscode-terminal-ansiYellow)',
        'terminal-ansi-blue': 'var(--vscode-terminal-ansiBlue)',
        'terminal-ansi-magenta': 'var(--vscode-terminal-ansiMagenta)',
        'terminal-ansi-cyan': 'var(--vscode-terminal-ansiCyan)',
        'terminal-ansi-white': 'var(--vscode-terminal-ansiWhite)',
        'terminal-ansi-bright-black': 'var(--vscode-terminal-ansiBrightBlack)',
        'terminal-ansi-bright-red': 'var(--vscode-terminal-ansiBrightRed)',
        'terminal-ansi-bright-green': 'var(--vscode-terminal-ansiBrightGreen)',
        'terminal-ansi-bright-yellow': 'var(--vscode-terminal-ansiBrightYellow)',
        'terminal-ansi-bright-blue': 'var(--vscode-terminal-ansiBrightBlue)',
        'terminal-ansi-bright-magenta': 'var(--vscode-terminal-ansiBrightMagenta)',
        'terminal-ansi-bright-cyan': 'var(--vscode-terminal-ansiBrightCyan)',
        'terminal-ansi-bright-white': 'var(--vscode-terminal-ansiBrightWhite)',
      },
    },
  },
  plugins: [],
}
</file>

<file path="The-Creator-AI-main/tsconfig.json">
{
	"compilerOptions": {
		"module": "esnext",
		"moduleResolution": "node",
		"target": "ESNext",
		"lib": [
			"ES2022",
			"DOM"
		],
		"jsx": "react",
		"sourceMap": true,
		"rootDir": ".",
		"strict": false, /* enable all strict type-checking options */
		"noImplicitAny": false,
		"noImplicitReturns": false,
		"noImplicitThis": false,
		/* Additional Checks */
		// "noImplicitReturns": true, /* Report error when not all code paths in function return a value. */
		// "noFallthroughCasesInSwitch": true, /* Report errors for fallthrough cases in switch statement. */
		// "noUnusedParameters": true,  /* Report errors on unused parameters. */
		"baseUrl": ".",
		"paths": {
			"@/*": ["src/*"]
		},
		"experimentalDecorators": true,
		"allowSyntheticDefaultImports": true
	},
	"include": [
		"src/**/*"
	]
}
</file>

<file path="The-Creator-AI-main/vsc-extension-quickstart.md">
# Welcome to your VS Code Extension

## What's in the folder

* This folder contains all of the files necessary for your extension.
* `package.json` - this is the manifest file in which you declare your extension and command.
  * The sample plugin registers a command and defines its title and command name. With this information VS Code can show the command in the command palette. It doesn’t yet need to load the plugin.
* `src/extension.ts` - this is the main file where you will provide the implementation of your command.
  * The file exports one function, `activate`, which is called the very first time your extension is activated (in this case by executing the command). Inside the `activate` function we call `registerCommand`.
  * We pass the function containing the implementation of the command as the second parameter to `registerCommand`.

## Setup

* install the recommended extensions (amodio.tsl-problem-matcher, ms-vscode.extension-test-runner, and dbaeumer.vscode-eslint)


## Get up and running straight away

* Press `F5` to open a new window with your extension loaded.
* Run your command from the command palette by pressing (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac) and typing `Hello World`.
* Set breakpoints in your code inside `src/extension.ts` to debug your extension.
* Find output from your extension in the debug console.

## Make changes

* You can relaunch the extension from the debug toolbar after changing code in `src/extension.ts`.
* You can also reload (`Ctrl+R` or `Cmd+R` on Mac) the VS Code window with your extension to load your changes.


## Explore the API

* You can open the full set of our API when you open the file `node_modules/@types/vscode/index.d.ts`.

## Run tests

* Install the [Extension Test Runner](https://marketplace.visualstudio.com/items?itemName=ms-vscode.extension-test-runner)
* Run the "watch" task via the **Tasks: Run Task** command. Make sure this is running, or tests might not be discovered.
* Open the Testing view from the activity bar and click the Run Test" button, or use the hotkey `Ctrl/Cmd + ; A`
* See the output of the test result in the Test Results view.
* Make changes to `src/test/extension.test.ts` or create new test files inside the `test` folder.
  * The provided test runner will only consider files matching the name pattern `**.test.ts`.
  * You can create folders inside the `test` folder to structure your tests any way you want.

## Go further

* Reduce the extension size and improve the startup time by [bundling your extension](https://code.visualstudio.com/api/working-with-extensions/bundling-extension).
* [Publish your extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) on the VS Code extension marketplace.
* Automate builds by setting up [Continuous Integration](https://code.visualstudio.com/api/working-with-extensions/continuous-integration).
</file>

<file path="The-Creator-AI-main/webpack.config.js">
//@ts-check

'use strict';

const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');

//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

/** @type WebpackConfig */
const extensionConfig = {
  target: 'node', // VS Code extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/
	mode: 'none', // this leaves the source code as close as possible to the original (when packaging we set this to 'production')

  entry: {
    extension: './src/extension.ts',
    chatView: './src/client/views/chat.view/view.tsx',
    changePlanView: './src/client/views/change-plan.view/view.tsx',
    fileExplorerView: './src/client/views/file-explorer.view/view.tsx',
  },  
  output: {
    // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    vscode: 'commonjs vscode' // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
    // modules added here also need to be added in the .vscodeignore file
  },
  resolve: {
    // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
    alias: {
      "@": path.resolve(__dirname, 'src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.?ts.?(x)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
          }
        }
      },
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
          // PostCSS (needed for Tailwind)
          "postcss-loader", 
        ],
      },
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "public", to: "public" }
      ],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
  }),
  ],
  devtool: 'nosources-source-map',
  infrastructureLogging: {
    level: "log", // enables logging required for problem matchers
  },
};
module.exports = [ extensionConfig ];
</file>

<file path="tsconfig.json">
{
    "compilerOptions": {
        "module": "esnext",
        "moduleResolution": "node",
        "target": "ESNext",
        "lib": ["ES2022", "DOM"],
        "jsx": "react",
        "sourceMap": true,
        "rootDir": ".",
        "strict": false,
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"]
        },
        "experimentalDecorators": true,
        "allowSyntheticDefaultImports": true
    },
    "include": ["src/**/*"]
}
</file>

<file path="webpack.config.js">
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');

/** @type {import('webpack').Configuration} */
const config = {
    target: 'node',
    mode: 'none',
    entry: {
        extension: './src/extension.ts',
        contextChooserView: './src/client/views/context-chooser.view/view.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    externals: {
        vscode: 'commonjs vscode'
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
        alias: {
            "@": path.resolve(__dirname, 'src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [{ loader: 'ts-loader' }]
            },
            {
                test: /\.?ts.?(x)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-typescript']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
            },
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: "public", to: "public" }],
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    devtool: 'nosources-source-map',
    infrastructureLogging: {
        level: "log",
    },
};
module.exports = [config];
</file>


















</prompt.md>

