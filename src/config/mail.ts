interface IMailConfig {
  driver: 'ethereal';
  defaults: {
    from: {
      name: string;
      email: string;
    };
  };
}

export default {
  driver: 'ethereal',
  defaults: {
    from: {
      email: 'equipegobarber@agrotudorn.com.br',
      name: 'Equipe GoBarber',
    },
  },
} as IMailConfig;
