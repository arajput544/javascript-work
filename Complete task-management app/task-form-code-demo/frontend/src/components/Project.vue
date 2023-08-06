<!-- THIS Detail.vue IS BEING USED FOR DEMO PURPOSES AND
    SHOULD NOT BE INCLUDED IN YOUR SUBMISSION -->

<!-- INSTEAD OF A Detail.vue YOU SHOULD HAVE SOMETHING LIKE Project.vue
    WHICH MAKES AN API CALL TO GET PROJECT BY ID WITH POPULATED DATA -->
<template>
    <div class="row">
        <div class="column-left">
            <ProjectForm v-if="isLoaded" v-bind:project="populated_project" v-bind:available_users="available_users" />
        </div>

        <div class="column-right">
            <div>
                <button class="btn" @click="openTaskModal()">+ Add Task</button>
            </div>
            <!-- EXAMPLE DEMO using HARD CODED TASK[0] INSTEAD OF ITERATING OVER TASKS USING v-for -->
            <!-- HOMEWORK 3 REQUIRES YOU TO DISPLAY ALL TASKS ASSOCIATED TO PROJECT-->
            <div v-for="task in populated_project.tasks" class="quiz-block">
                <TaskForm v-if="isLoaded" v-bind:task="task" v-bind:available_users="available_users"
                    v-bind:priorities="priorities" v-bind:statuses="statuses"
                    v-bind:project_name="populated_project.name" />
            </div>

            <Modal v-if="showModal" v-bind:task="add_task" v-bind:available_users="available_users"
                v-bind:priorities="priorities" v-bind:statuses="statuses" v-bind:project_name="populated_project.name"
                @closeModal="closeModal" />
        </div>
    </div>
</template>

<script>
import ProjectForm from './ProjectForm.vue'
import TaskForm from './TaskForm.vue'

import Modal from './Modal.vue'

export default {
    name: 'Project',
    components: {
        ProjectForm,
        TaskForm,
        Modal
    },
    data() {
        return {
            populated_project: {},
            available_users: [],
            priorities: [],
            statuses: [],
            isLoaded: false,

            add_task: {},
            showModal: false
        }
    },
    methods: {
        openTaskModal() {
            // create an empty task object with the associated project id and empty timeline object
            this.add_task = { project: this.populated_project._id, timeline: {} }
            this.showModal = true
        },
        setData(project, users, priorities, statuses) {
            this.populated_project = { ...project }

            this.available_users = users.map(user => {
                return { _id: user._id, name: `${user.first} ${user.last}` }
            })

            this.priorities = priorities
            this.statuses = statuses

            this.isLoaded = true
        },
        closeModal() {
            this.showModal = false
        }
    },
    async beforeRouteEnter(to, from, next) {
        const identifier = to.params.identifier

        const projectRes = await fetch(`http://localhost:8888/projects/${identifier}`)
        const project = await projectRes.json()

        // get all users who are available to be associated to the project
        const usersRes = await fetch(`http://localhost:8888/users/?project=${identifier}`)
        const users = await usersRes.json()

        // get all users who are available to be associated to the project
        const priorityRes = await fetch(`http://localhost:8888/tasks/priorities`)
        const priorities = await priorityRes.json()

        // get all users who are available to be associated to the project
        const statusRes = await fetch(`http://localhost:8888/tasks/statuses`)
        const statuses = await statusRes.json()

        next(function (vm) {
            return vm.setData(project, users, priorities, statuses)
        })

    }
}

</script>

<style>
.column-left {
    float: left;
    width: 49%;
    margin-right: 1%;
}

.column-right {
    float: right;
    width: 50%;
}
</style>