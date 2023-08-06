

    <template>
        
        <div>
            <button class="btn" @click="method1()">+ Add Project</button>
        </div>
        <button class="btn" @click="method2()">All Projects</button>
        <div>
            <div v-for="project in project_data" class="project-block">
                <div class="project-card">
                    <div class="content">
                        <span class="title">{{ project.name }}</span>
                        <p class="text">
                            {{ project.description }}
                        </p>
                        <p class="text">
                            {{ project.repository }}
                        </p>
                        <RouterLink class="btn" :to="`/details/${project._id}`">Details</RouterLink>
                    </div>
                    <div class="project-btn-container">
                        <!-- <RouterLink class="btn" :to="`/details/${project._id}`">Details</RouterLink> -->
                    </div>
                </div>
            </div>
            
        </div>
    
        <Modal v-if="showModal" v-bind:project="project_data" v-bind:available_users="available_users"
            @closeModal="closeModal" />
    </template>
    
    <script>
    import Modal from './ProjectModal.vue';
    export default {
        name: 'Projects',
        components: {
            Modal
        },
        data() {
            return {
                available_users: [],
                project_data: {},
                showModal: false
            }
        },
        methods: {
            async method1(projectId = null) {
                // get all users who are available to be associated to the project
                const usersRes = await fetch(`http://localhost:8888/users/?project=${projectId}`)
                const users = await usersRes.json()
    
                this.available_users = users.map(user => {
                    return { _id: user._id, name: `${user.first} ${user.last}` }
                })
    
                this.project_data = {}
                this.showModal = true
            },
            async method2(){
            
            const res = await fetch(`http://localhost:8888/projects`)
    
            const body = await res.json();
            this.project_data = body;
        },
            closeModal() {
                this.showModal = false
            }
        }
    }
    
    
    </script>
    
    <style>
    .project-list-container {
        display: grid;
        justify-content: center;
        align-content: center;
        grid-auto-columns: 1fr;
        grid-auto-flow: column;
        gap: 10px;
    }
    
    .project-block {
        margin: 10px 5px;
    }
    
    .project-card {
        background-color: #2b2d42
    }
    
    .project-card .title {
        font-size: 32px;
        font-family: 'Roboto Condensed', sans-serif;
        margin-bottom: 25px;
    }
    
    .project-card .content {
        color: #FFF;
        min-height: 310px;
        padding: 30px 20px;
    }
    
    .project-card .heading {
        color: #a7adc5;
        text-transform: uppercase;
        display: block;
    }
    
    .project-card .text {
        font-size: 14px;
        padding-bottom: 10px;
    }
    
    .project-card .project-btn-container {
        color: #FFF;
    }
    
    .btn {
        background: #ffad01;
        border: 1px solid #000;
        color: #FFF;
        padding: 5px 15px;
        border-radius: 25px;
        cursor: pointer;
        font-size: 14px;
        text-decoration: none;
    }
    
    .btn:hover {
        background: #8b691f;
        color: #FFF;
    }
    </style>