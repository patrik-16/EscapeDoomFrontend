const headers = new Headers()
headers.append("Content-Type", "application/json")

export async function joinEscapeRoom(id: string): Promise<string> {

   const response = (await fetch(`http://localhost:8090/api/join/${id}`, {
        method: 'GET',
        headers: headers,
    }))
    const text = await response.text()
    // console.log('Text: ' + text)
    return text
}