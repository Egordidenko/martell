<template>
  <div class="authorization">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-4">
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                class="form-control"
                placeholder="Enter email"
                type="email"
              >
              <small
                id="emailHelp"
                class="form-text text-muted"
              >We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                id="exampleInputPassword1"
                class="form-control"
                placeholder="Password"
                type="password"
              >
            </div>
            <div class="form-group form-check">
              <input
                id="exampleCheck1"
                class="form-check-input"
                type="checkbox"
              >
              <label
                class="form-check-label"
                for="exampleCheck1"
              >Check me out</label>
            </div>
            <button
              class="btn btn-primary"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss"></style>
