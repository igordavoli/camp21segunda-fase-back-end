/* eslint-disable object-shorthand */
const { StatusCodes } = require('http-status-codes');
const { professionalsService, usersService, consultationsService } = require('../services');
const yup = require('yup');

module.exports = {
  list: async (req, res) => {
    try {
      const options = req.query;
      const id = req.paramsId;
      const isProfessional = req.session.isProfessional;

      const response = await consultationsService.list(id, options, isProfessional)

      if (!response || response.data.length === 0) {
        return res.status(StatusCodes.NO_CONTENT).end();
      }

      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      console.log(error);

      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message);
    }
  },

  create: async (req, res) => {
    try {
      const { consultation } = req.body;

      const userId = req.paramsId;

      const schema = yup.object().shape({
        professionalId: yup.string().required(),
        reason: yup.string().required(),
      });

      await schema.validate(consultation, {
        abortEarly: false,
        stripUnknown: true,
      });

      const storedConsultation = await consultationsService.create(consultation, userId);

      res.status(StatusCodes.CREATED).json(storedConsultation);
    } catch (error) {
      console.log(error);
      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message);
    }
  },
};