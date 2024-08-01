"use client"
import { MantineProvider } from "@mantine/core"
import store from "."
import { Provider } from "react-redux"
import { SessionProvider } from "next-auth/react";

import "@mantine/core/styles.css"

export function Providers({ children }) {
    return <Provider store={store}>
        <MantineProvider>
        <SessionProvider>{children}</SessionProvider>
                    </MantineProvider>
    </Provider>
}