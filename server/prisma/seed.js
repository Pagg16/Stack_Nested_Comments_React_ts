import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  const kyle = await prisma.user.create({ data: { name: "Dash" } });
  const sally = await prisma.user.create({ data: { name: "Flash" } });

  const post1 = await prisma.post.create({
    data: {
      body: "Задача организации, в особенности же разбавленное изрядной долей эмпатии, рациональное мышление играет важную роль в формировании первоочередных требований. Задача организации, в особенности же внедрение современных методик требует от нас анализа приоретизации разума над эмоциями. Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта: консультация с широким активом предопределяет высокую востребованность анализа существующих паттернов поведения. Также как граница обучения кадров не даёт нам иного выбора, кроме определения поэтапного и последовательного развития общества! В своём стремлении улучшить пользовательский опыт мы упускаем, что ключевые особенности структуры проекта объявлены нарушающими общечеловеческие нормы этики и морали. Значимость этих проблем настолько очевидна, что социально-экономическое развитие предполагает независимые способы реализации направлений прогрессивного развития. Следует отметить, что укрепление и развитие внутренней структуры играет определяющее значение для укрепления моральных ценностей. Предварительные выводы неутешительны: перспективное планирование требует от нас анализа соответствующих условий активизации! Мы вынуждены отталкиваться от того, что постоянное информационно-пропагандистское обеспечение нашей деятельности не даёт нам иного выбора, кроме определения новых принципов формирования материально-технической и кадровой базы! Но многие известные личности будут призваны к ответу. Разнообразный и богатый опыт говорит нам, что новая модель организационной деятельности требует от нас анализа вывода текущих активов. Имеется спорная точка зрения, гласящая примерно следующее: сторонники тоталитаризма в науке, превозмогая сложившуюся непростую экономическую ситуацию, заблокированы в рамках своих собственных рациональных ограничений. Идейные соображения высшего порядка, а также существующая теория предоставляет широкие возможности для дальнейших направлений развития. Значимость этих проблем настолько очевидна, что синтетическое тестирование, в своём классическом представлении, допускает внедрение новых предложений. Повседневная практика показывает, что экономическая повестка сегодняшнего дня требует от нас анализа системы обучения кадров, соответствующей насущным потребностям.",
      title: "Post 1",
    },
  });
  const post2 = await prisma.post.create({
    data: {
      body: "Proin ut sollicitudin lacus. Mauris blandit, turpis in efficitur lobortis, lectus lacus dictum ipsum, vel pretium ex lacus id mauris. Aenean id nisi eget tortor viverra volutpat sagittis sit amet risus. Sed malesuada lectus eget metus sollicitudin porttitor. Fusce at sagittis ligula. Pellentesque vel sapien nulla. Morbi at purus sed nibh mollis ornare sed non magna. Nunc euismod ex purus, nec laoreet magna iaculis quis. Mauris non venenatis elit. Curabitur varius lectus nisl, vitae tempus felis tristique sit amet.",
      title: "Post 2",
    },
  });

  const comment1 = await prisma.comment.create({
    data: {
      message: "I am a root comment",
      userId: kyle.id,
      postId: post1.id,
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      parentId: comment1.id,
      message: "I am a nested comment",
      userId: sally.id,
      postId: post1.id,
    },
  });

  const comment3 = await prisma.comment.create({
    data: {
      message: "I am another root comment",
      userId: sally.id,
      postId: post1.id,
    },
  });
}

seed();
