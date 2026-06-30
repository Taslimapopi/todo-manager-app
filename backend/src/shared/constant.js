export const validation = Object.freeze({
    nameMaxLength : 20,
    passMinLength : 6,
    bcrypt_salt_round : 12,
    todo_title_length : 50,
    todo_description_maxLength : 300,
})

export const http_status = {
    created : 201,
    ok : 200,
    conflict : 409,
    unAuthorized : 401
}