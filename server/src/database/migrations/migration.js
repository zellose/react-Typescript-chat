'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('Posts', 'displayname', { type: Sequelize.STRING });
		/*
			Example:
			return queryInterface.createTable('users', { id: Sequelize.INTEGER });
		*/
	},

	down: (queryInterface, Sequelize) => {
		
	}
};
