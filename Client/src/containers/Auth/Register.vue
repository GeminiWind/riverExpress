<template>
  <div class="col-md-4 col-md-offset-4">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">
                        Register A New Account
                    </h3>
                </div>
                <div class="panel-body">
                    <form @submit.prevent="register">
                        <fieldset>
                           	<div class="form-group">
                               <input class="form-control" name="firstName" placeholder="Your First Name" type="text" v-model=user.firstName v-validate="'required'">
                                </input>
                                 <div v-show="errors.has('firstName')" class="alert alert-danger">{{ errors.first('firstName') }}</div>
                            </div>
                            <div class="form-group">
                                <input class="form-control" name="lastName" placeholder="Your Last Name" type="text" v-model=user.lastName v-validate="'required'">
                                </input>
                                 <div v-show="errors.has('lastName')" class="alert alert-danger">{{ errors.first('lastName') }}</div>
                            </div>	
                            <div class="form-group">
                                <input class="form-control" name="email" placeholder="Your E-mail" type="text" v-model=user.email v-validate="'required|email'">
                                </input>
                                 <div v-show="errors.has('email')" class="alert alert-danger">{{ errors.first('email') }}</div>
                            </div>
                            <div class="form-group">
                                <input class="form-control" name="password" placeholder="Password at least 6 characters" type="password" value="" v-model=user.password v-validate="'required|min:6'">
                                </input>
                                 <div v-show="errors.has('password')" class="alert alert-danger">{{ errors.first('password') }}</div>
                            </div>
                            <div class="form-group">
                                <input class="form-control" name="password_confirmed" placeholder="Re-enter password" type="password" value="" v-validate="'required|confirmed:password'">
                                </input>
                                 <div v-show="errors.has('password_confirmed')" class="alert alert-danger">{{ errors.first('password_confirmed') }}</div>
                            </div>
                            <input class="btn btn-lg btn-success btn-block" type="submit" value="Submit">
                            </input>
                        </fieldset>
                    </form>
                    <div>
                     	<router-link :to="{ path: '/' }" class="pull-left">Already Account </router-link>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    export default {
        data(){
            return {
                user: {
                   email: '',
                   password: '',
                   firstName: '',
                   lastName: ''
                }
            }
        },
       methods: {
        async register () {
            this.$validator.validateAll()
            if (!this.errors.any()) {
                try {
                    const { data } = await this.$http.post('/register', this.user);
                    this.$router.push({ path: '/'});
                } catch (error) {
                    this.$router.push({ path: '/500'});
                }
            }
        }
    }
}
</script>