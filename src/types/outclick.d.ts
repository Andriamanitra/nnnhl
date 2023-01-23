declare namespace svelteHTML {
    interface HTMLAttributes<T> {
        "on:outclick"?: CompositionEventHandler<T>;
    }
}