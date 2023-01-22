<script>
  import { themeStore } from "../stores";
  themeStore.subscribe((newTheme) => {
    document
      .getElementsByTagName("html")[0]
      .setAttribute("data-theme", newTheme);
  });
  function changeTheme() {
    themeStore.update((old) => (old === "dark" ? "light" : "dark"));
  }
</script>

<button on:click={changeTheme}>Toggle darkness</button>
