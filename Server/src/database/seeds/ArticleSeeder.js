import faker from 'faker';
import mongoose from 'mongoose';
import Article from '../../app/Models/Article';
import { loadEnv } from '../../config/env';

faker.locale = 'en_US';

loadEnv();
mongoose.connect(process.env.MONGODB_URL, {
  useMongoClient: true,
});
mongoose.Promise = global.Promise;

const categories = ['Bussiness', 'Technology', 'Game', 'Fashion', 'Politics', 'Economy', 'Lifstyle', 'Travel'];

for (let i = 0; i < 30; i++) {
  const article = new Article();
  article.title = faker.lorem.sentence();
  article.content = faker.lorem.paragraphs(4);
  article.short_intro = faker.lorem.sentences(3);
  const category = faker.random.arrayElement(categories);
  article.tags = category;
  article.category = category;
  article.author = {
    name: faker.name.findName(),
    dob: faker.date.past(),
    intro: faker.lorem.sentences(3),
  };
  article.popular = faker.random.boolean();
  article.image = faker.image.imageUrl();
  article.save()
    .then()
    .catch();
}
