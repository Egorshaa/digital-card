/**
 * Имена GraphQL-операций и полей в одном месте (аналог controllerKey для REST).
 * Менять имя в API нужно только здесь, а не в нескольких декораторах.
 */
class Profile {
  root = 'profile';
  links = 'links';
  skills = 'skills';
  experience = 'experience';
  projects = 'projects';
}

class Resolver {
  profile = new Profile();
}

export const resolverKey = new Resolver();
