const Joi = require('joi');


module.exports = {

    login: {
        body: {
            email: Joi.string().required().empty(),
            password: Joi.string().required().empty(),            
        }
    },
    addContact:{
        body:{
        name:Joi.string().required().empty(),
        email : Joi.string().required().empty(),
        contact_no:Joi.number().required().empty(),
        msg:Joi.string().required().empty(),
        }
    },
    deletContact:{
        body:{
            contact_id:Joi.number().required().empty(),
        }
    },
    addContent:{
        body:{
            content_name:Joi.string().required().empty(),
        description:Joi.string().required().empty(),
        }
    },
    deletContent:{
        body:{
            content_id:Joi.number().required().empty(),
        }
    },
    updateContent:{
        body:{
            content_name:Joi.string().required().empty(),
        }
    },
    addFaq:{
        body:{
            question:Joi.string().required().empty(),
        answer:Joi.string().required().empty(),
        }
    },
    updateFaq:{
        body:{
            faq_id:Joi.number().required().empty(),
        }
    },
    deletFaq:{
        body:{
            faq_id:Joi.number().required().empty(),
        }
    },
  
};



