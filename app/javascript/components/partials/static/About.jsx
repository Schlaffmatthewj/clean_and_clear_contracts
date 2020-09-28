import React from "react"

export default () => (
  <main className='main-container flex-column'>
    <article className='about-container'>
      <h2>Vistors &amp; Companies &amp; Project Owners</h2>
      <div className='about'>
        You have access to visuals of the pages and will see a Login link 
        rather than a Profile link. Clicking on a Company's link will take 
        you to their page. Displaying all Projects, Tasks and Owned Projects 
        that they have registered. Clicking on a Project or Task will take you 
        to a display for all of the data regarding a single Project or Task. 
        Tracks the Budget of the Project and the Total Cost of all Phases and 
        Tasks. Tracks the Budget of the Task and the Amount of the Contract. 
        You can create a Company Profile which will grant access to more features 
        of the app.
      </div>

      <h2>Companies &amp; Project Owners</h2>
      <div className='about'>
      When on your own Company's Profile there will be an option for 
      Prime Contractor. Prime Contractors can Create new Phases which allows for 
      cleaner job organization. Create as many Tasks needed to complete a Phase. 
      Tasks will give descriptions of the jobs to be completed within a scheduled 
      time. Have access to additional features regarding Projects and Tasks. 
      Projects will have an option to acquire the Prime Contract. This data 
      will now be linked to your Company's Profile. Tasks will have an option to 
      acquire the Sub Contract. This data will now be linked to your Company's 
      Profile. When on your own Company's Profile there will be a option for 
      Project Owner.
      </div>

      <h2>Project Owners</h2>
      <div className='about'>
          Create new Projects. Update and Delete old Projects.
      </div>
    </article>
  </main>
)