<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/register">New User</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/update">Edit Profile</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/login">Logout</router-link>
        </li>
      </ol>
    </nav>

    <h1>Hi {{account.user.name}}!</h1>
    <p>You're logged on User Control System</p>
    <p>Users from secure api endpoint:</p>
    <em v-if="users.loading">Loading users...</em>
    <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
    <ul v-if="users.items">
      <li v-for="user in users.items" :key="user.id">
        {{user.name + ' - ' + user.email}}
        <span v-if="user.deleting">
          <em>- Deleting...</em>
        </span>
        <span v-else-if="user.deleteError" class="text-danger">- ERROR: {{user.deleteError}}</span>
        <span v-else>
          -
          <a @click="deleteUser(user.id)" class="text-danger">Delete</a>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({
      account: state => state.account,
      users: state => state.users.all,
    }),
  },
  created() {
    this.getAllUsers();
  },
  methods: {
    ...mapActions('users', {
      getAllUsers: 'getAll',
      deleteUser: 'delete',
    }),
  },
};
</script>