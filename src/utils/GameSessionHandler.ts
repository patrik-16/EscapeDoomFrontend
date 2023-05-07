const sessionString = 'sessionId'

export const getSessionId = () => {
    return sessionStorage.getItem(sessionString)
}

export const setSessionId = (sessionId: string) => {
    return sessionStorage.setItem(sessionString, sessionId)
}