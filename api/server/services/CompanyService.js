const database = require('../src/models');

class CompanyService {
    static async getAllCompanies() {
      try {
        return await database.Company.findAll();
      } catch (error) {
        throw error;
      }
    }
  
    static async addCompany(newCompany) {
      try {
        return await database.Company.create(newCompany);
      } catch (error) {
        throw error;
      }
    }
  
    static async updateCompany(id, updateCompany) {
      try {
        const companyToUpdate = await database.Company.findOne({
          where: { id: Number(id) }
        });
  
        if (companyToUpdate) {
          await database.Company.update(updateCompany, { where: { id: Number(id) } });
  
          return updateCompany;
        }
        return null;
      } catch (error) {
        throw error;
      }
    }
  
    static async getACompany(id) {
      try {
        const theCompany = await database.Company.findOne({
          where: { id: Number(id) }
        });
  
        return theCompany;
      } catch (error) {
        throw error;
      }
    }
  
    static async deleteCompany(id) {
      try {
        const companyToDelete = await database.Company.findOne({ where: { id: Number(id) } });
  
        if (companyToDelete) {
          const deletedCompany = await database.Company.destroy({
            where: { id: Number(id) }
          });
          return deletedCompany;
        }
        return null;
      } catch (error) {
        throw error;
      }
    }
  }
  
  module.exports = CompanyService;