const { consultationsRepository } = require('../../repositories');

module.exports.listConsultations = async (professionalId, options) => {
  const { firstName, lastName, status } = options;

  const query = {
    where: [{ professional_id: professionalId }],
    include: [
      {
        association: 'user',
        attributes: ['id', 'firstName', 'lastName', 'telephone']
      }
    ]
  };

  if (status && status !== '') {
    query.where.push({ status });
  }

  if (firstName && firstName !== '') {
    query.include.push({
      association: 'user',
      where: { firstName }
    });
  }

  if (lastName && lastName !== '') {
    query.include.push({
      association: 'user',
      where: { lastName }
    });
  }



  const { count, rows } = await consultationsRepository.list(query);

  return {
    metadata: { total: count },
    data: rows,
  };
};
