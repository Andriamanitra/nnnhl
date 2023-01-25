<script lang="ts">
    import { videoSrcStore } from "../stores";
    import { clickOutside } from "./clickOutside";
    import { onMount } from "svelte";
    let video: HTMLVideoElement;
    let visible = false;
    onMount(async () => {
        const { default: Hls } = await import("hls.js");
        video = document.querySelector("#video");
        videoSrcStore.subscribe((newSrc) => {
            if (newSrc === "") return;
            if (Hls.isSupported()) {
                let hls = new Hls();
                hls.attachMedia(video);
                visible = true;
                hls.on(Hls.Events.MEDIA_ATTACHED, function () {
                    hls.loadSource(newSrc);
                    video.play();
                });
            }
        });
    });
    document.addEventListener("keydown", (ev) => {
        if (ev.code === "Escape") closeVideo();
    });
    const closeVideo = () => {
        video.pause();
        visible = false;
        videoSrcStore.set("");
    };
</script>

<div
    class="video-container"
    class:hidden={!visible}
    use:clickOutside
    on:outclick={closeVideo}
>
    <!-- svelte-ignore a11y-media-has-caption -->
    <video id="video" width="1280" height="720" controls={true} />
    <div
        role="button"
        class="minimal-button"
        title="Close video"
        on:click={closeVideo}
        on:keydown={closeVideo}
    >
        Press esc to close video
    </div>
</div>

<style>
    .hidden {
        display: none;
    }
    #video,
    .video-container {
        width: min(95vw, 1280px);
        height: auto;
        aspect-ratio: 16 / 9;
    }
    .video-container {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0px 0px 0px 1000px rgba(0, 0, 0, 0.7);
    }
    .video-container .minimal-button {
        position: absolute;
        color: whitesmoke;
        right: 0px;
        top: -3em;
    }
    .minimal-button {
        cursor: pointer;
        border: none;
        background: none;
        font-family: arial;
        font-size: 12px;
        font-weight: 400;
    }
    .minimal-button:focus {
        text-decoration: underline;
        outline: none;
    }
    .minimal-button:hover {
        text-decoration: underline;
    }
</style>
