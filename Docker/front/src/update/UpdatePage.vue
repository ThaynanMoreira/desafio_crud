<template>
    <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                <router-link to="/">Home</router-link>
                </li>
                <li class="breadcrumb-item">
                    <router-link to="/register">New User</router-link>
                </li>
                <li class="breadcrumb-item">
                <router-link to="/login">Logout</router-link>
                </li>
            </ol>
        </nav>
        <h2>Update Profile</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" v-model="user.name" v-validate="'required'" name="name" class="form-control" :class="{ 'is-invalid': submitted && errors.has('name') }" />
                <div v-if="submitted && errors.has('name')" class="invalid-feedback">{{ errors.first('name') }}</div>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="text" v-model="user.email" v-validate="'required'" name="email" class="form-control" :class="{ 'is-invalid': submitted && errors.has('email') }" />
                <div v-if="submitted && errors.has('email')" class="invalid-feedback">{{ errors.first('email') }}</div>
            </div>
            <div class="form-group">
                <label htmlFor="old_password">Old Password</label>
                <input type="password" v-model="user.oldPassword" v-validate="{ required: true, min: 6 }" name="old_password" class="form-control" :class="{ 'is-invalid': submitted && errors.has('old_password') }" />
                <div v-if="submitted && errors.has('old_password')" class="invalid-feedback">{{ errors.first('old_password') }}</div>
            </div>
            <div class="form-group">
                <label htmlFor="password">New Password</label>
                <input type="password" v-model="user.password" v-validate="{ required: true, min: 6}" name="password" ref="password" class="form-control" :class="{ 'is-invalid': submitted && errors.has('password') }" />
                <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div>
            </div>
            <div class="form-group">
                <label htmlFor="confim_password">Confirm Password</label>
                <input type="password" v-model="user.confirmPassword" v-validate="'required|confirmed:password'" name="confim_password" class="form-control" :class="{ 'is-invalid': submitted && errors.has('confim_password') }" />
                <div v-if="submitted && errors.has('confim_password')" class="invalid-feedback">{{ errors.first('confim_password') }}</div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" :disabled="status.updating">Update</button>
                <img v-show="status.updating" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                <router-link to="/" class="btn btn-link">Cancel</router-link>
            </div>
    
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            user: {
                name: '',
                email: '',
                oldPassword: '',
                password: '',
                confirmPassword: ''
            },
            submitted: false
        }
    },
    computed: {
        ...mapState('account', ['status']),
        ...mapState({
            id: state => state.account.user.id
        }),
    },
    methods: {
        ...mapActions('account', ['update']),
        handleSubmit(e) {
            this.submitted = true;
            const { id, user } = this;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.update({id, user});
                }
            });
        }
    }
};
</script>