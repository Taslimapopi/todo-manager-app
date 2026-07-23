import { object, ZodError } from "zod";

export const validate = (schema) => (req, _res, next) => {
  try {
    const parsed = schema.parse({
      body: req.body,
      query: req.query
    });

    ['body','query'].forEach(key =>{
      if (key in parsed){
        Object.defineProperty(req,key,{
          value : parsed[key],
          writable : true,
          enumerable : true,
          configurable : true
        })
      }
    })
  

     if ('body' in parsed) req.body = parsed.body;
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      error.issues.map((err) => ({
        field: err.path.length ? err.path.join(".") : "unknown",
        message: err.message,
      }));
    }
  }
};
