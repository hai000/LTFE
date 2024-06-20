

export const loadUser = ((state) =>JSON.parse(JSON.stringify(state.user)));
export const loadConversationPane = ((state) =>JSON.parse(JSON.stringify(state.conversationPane)));
export const loadMessages = ((state) =>JSON.parse(JSON.stringify(state.messages)));