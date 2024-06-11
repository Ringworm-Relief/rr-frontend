
# <p align="center">[Ringworm Relief](https://rr-as.vercel.app/) ~`50 hours`</p>
<p align='center' >👆<b>Click the heading to visit the deploy link</b>👆</p>

<p align="center">A multi-user application providing a hub for pet ringworm support and education. Ringworm treatment in multi-pet households is more often than not, a sentence to be strung out, overworked, and hypervigilant until treatment is over AND no re-infection occurs. But what does treatment even look like? Did you know most animals at shelters who contract ringworm are usually euthanized because of how aggressive and contagious the fungus is? Education sourced from those who foster ringworm animals to prevent these euthanizations is the best knowledge there is. However, I know from experience, that this information is nested in random forums online, or comments in a one-off Facebook post. RR is aimed at providing a hub of education and information tried and tested by those who have experienced it and successfully rid their household of the fungus.</p>

### <p align="center">Contributors</p>
<div align="center">Asher Spurr: https://github.com/AsherSpurr, Pareesa Kamgar-Dayhoff: https://github.com/pareesakd1118</div>

<p align="center">Technologies Used</p>
<div align="center">
<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" alt="TypeScript" title="TypeScript"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" alt="React" title="React"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png" alt="HTML" title="HTML"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png" alt="CSS" title="CSS"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/68279555/200387386-276c709f-380b-46cc-81fd-f292985927a8.png" alt="Cypress" title="Cypress"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/189716630-fe6c084c-6c66-43af-aa49-64c8aea4a5c2.png" alt="Material UI" title="Material UI"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/192108372-f71d70ac-7ae6-4c0d-8395-51d8870c2ef0.png" alt="Git" title="Git"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/192108374-8da61ba1-99ec-41d7-80b8-fb2f7c0a4948.png" alt="GitHub" title="GitHub"/></code>
	<code><img width="50" src="https://github-production-user-asset-6210df.s3.amazonaws.com/136815194/253220886-02494c7c-de6a-43a6-9293-6369696842ed.png" alt="Canva" title="Canva"/></code>
</div>

## Installation Instructions:
- Run the following on the command line to clone the repo and run the app locally:
    ```
    git clone git@github.com:Ringworm-Relief/rr-frontend.git
    cd rr-frontend
    npm install
    npm start
    ```

### Run Tests
- Ensure you're running the app locally (see Installation Instructions above)
- Run the following on the command line to open Cypress: `npm run cypress` or `npx cypress open`
- Click `E2E Testing`, then `Start E2E Testing` in the desired browser
- Select `a test suite` to run all tests related to that suite
## Future Features/Improvements
- Google OAuth2.0 for a more secure login
- Adding data visualization to the dashboard. Eg: treatment progress based on medication application
- Allow users to upload a profile picture and add a pet profile picture
- Auto-create calendar events for medications based off of frequency, including params in the calendar to select what type of medication.
- Use a global state management tool
- Complete the transition to a PWA
- Utilize caching or cookies, this could be tied to the PWA transition
## Context:
<!-- wins, challenges, time spent, goals, approaches etc -->
### Wins
- Pulling in a brand new 3rd party tech, using Syncfusion's scheduler
- Using a true login for the first time 
- Learning how to better read official documentation in the process of using Syncfusions scheduler
### Challenges
- Learning how to navigate Syncfusions calendar and follow their documentation
- Defaulting to type any in TypeScript which moderately defeats the point
- Implementing CI/CD


