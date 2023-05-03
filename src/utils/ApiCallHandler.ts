import { getLectureToken } from "./TokenHandler"

const headers = new Headers()
headers.append("Content-Type", "application/json")

export async function joinEscapeRoom(id: string) {

   const response = (await fetch(`http://localhost:8090/api/join/${id}`, {
        method: 'GET',
        headers: headers,
    }))
    const text = await response.text()
    return text
}

export async function startEscapeRoom(id: number): Promise<string> {
    
    const authHeaders = new Headers()
    authHeaders.append("Content-Type", "application/json")
    authHeaders.append("Authorization", "Bearer " + getLectureToken())

    const response = (await fetch(`http://localhost:8080/api/v1/portal-escape-room/startEscapeRoom/${id}`, {
        method: 'POST',
        headers: authHeaders,
        redirect: 'follow'
    }))
    const text = await response.text()
    return text
    
}

export async function openEscapeRoom(id: number): Promise<string> {
    
    const authHeaders = new Headers()
    authHeaders.append("Content-Type", "application/json")
    authHeaders.append("Authorization", "Bearer " + getLectureToken())

    const response = (await fetch(`http://localhost:8080/api/v1/portal-escape-room/openEscapeRoom/${id}`, {
        method: 'POST',
        headers: authHeaders,
        redirect: 'follow'
    }))
    const text = await response.text()
    return text
}

export async function stopEscapeRoom(id: number): Promise<string> {
    
    const authHeaders = new Headers()
    authHeaders.append("Content-Type", "application/json")
    authHeaders.append("Authorization", "Bearer " + getLectureToken())

    const response = (await fetch(`http://localhost:8080/api/v1/portal-escape-room/stopEscapeRoom/${id}`, {
        method: 'POST',
        headers: authHeaders,
        redirect: 'follow'
    }))
    const text = await response.text()
    return text
}