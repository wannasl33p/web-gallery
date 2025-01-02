import { configureStore } from "@reduxjs/toolkit";

import { artsReducer } from "./slices/arts";
import { authReducer } from "./slices/auth";
import { profileReducer } from "./slices/profile";
import { moderationReducer } from "./slices/moderation";

const store = configureStore({
    reducer: {
        arts: artsReducer,
        auth: authReducer,
        profile: profileReducer,
        moderation: moderationReducer,
    }
});

export default store