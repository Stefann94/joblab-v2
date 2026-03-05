// Importă clientul tău Supabase (presupunând că ai configurarea făcută)
// import { supabase } from './supabase-config.js'; 

async function loadLiveProjects() {
    const container = document.getElementById('ticker-load-container');
    
    // Exemplu de fetch din Supabase (comentează dacă nu ai conexiunea activă încă)
    // const { data: projects, error } = await supabase.from('projects').select('*');
    
    // Date de fallback (în caz că Supabase nu e încă legat)
    const fallbackData = [
        { job_code: '#0214', title: 'INGINER PROIECTANT', location: 'SIBIU', salary: '1.800€' },
        { job_code: '#0215', title: 'OPERATOR CNC', location: 'CLUJ', salary: '1.200€' },
        { job_code: '#0216', title: 'FRONTEND DEVELOPER', location: 'REMOTE', salary: '3.500€' }
    ];

    const data = fallbackData; // Aici înlocuiești cu 'projects' după ce legi Supabase

    if (data) {
        // Dublăm setul de date pentru un scroll infinit fără pauze
        const fullList = [...data, ...data];
        
        container.innerHTML = fullList.map(job => `
            <div class="ticker-item" onclick="window.location.href='${job.link || '#'}'">
                <span class="job-code">${job.job_code}</span>_
                <span class="job-name">${job.title}</span> - 
                <span class="job-loc">${job.location}</span> - 
                <span class="job-salary">${job.salary}</span>
            </div>
        `).join('');
    }
}

document.addEventListener('DOMContentLoaded', loadLiveProjects);