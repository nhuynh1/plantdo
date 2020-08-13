import React from 'react';
import '../styles/AboutPage.css';

const AboutPage = () => {
    return (
        <div className="AboutPage">
            <h2>About Plant-Do</h2>
            <p>Plant-Do is a task management tool based on the simplicity of Bullet Journaling:</p>
            <ul>
                <li><strong>Accomplishment</strong>: Complete a task and see a cute cactus</li>
                <li><strong>Migration</strong>: Manually clicking the Migrate button to migrate tasks to Today creates opportunity to reflect on whether the task is worth completing</li>
            </ul>
        </div>
    )
}

export default AboutPage;