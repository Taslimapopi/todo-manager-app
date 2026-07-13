export const validation = Object.freeze({
    nameMaxLength : 20,
    passMinLength : 6,
    bcrypt_salt_round : 12,
    todo_title_length : 50,
    todo_description_maxLength : 300,
    bulk_create_max : 50
})

export const http_status = {
    created : 201,
    ok : 200,
    conflict : 409,
    unAuthorized : 401,
    internal_server_error : 500,
    bad_request : 400,

}

export const pagination = Object.freeze({
    default_page : 1,
    max_page : 100
})