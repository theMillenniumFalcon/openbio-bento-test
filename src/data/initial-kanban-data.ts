export const INITIAL_KANBAN_DATA: KanbanListType[] = [
  {
    listName: '01',
    listItems: [
      {
        teamName: 'CHRONOS',
        taskTitle: 'Inbox Design',
        ticketID: 1,
        tags: ['design', 'blocker'],
        assignees: [
          {
            username: 'themillenniumfalcon',
            avatar: 'https://github.com/themillenniumfalcon.png',
          },
        ],
      },
      {
        teamName: 'CHRONOS',
        taskTitle: 'Inbox Infrastructure',
        ticketID: 2,
        tags: ['backend'],
        assignees: [
          {
            username: 'themillenniumfalcon',
            avatar: 'https://github.com/themillenniumfalcon.png',
          },
          {
            username: 'medhavinimathur1804',
            avatar: 'https://github.com/medhavinimathur1804.png',
          },
        ],
      },
      {
        teamName: 'CHRONOS',
        ticketID: 8,
        taskTitle: 'Build Conversation Module',
        tags: ['frontend', 'data'],
        assignees: [],
      },
    ],
  },
  {
    listName: '02',
    listItems: [
      {
        teamName: 'LABS',
        taskTitle: "Setup co-pilot API's",
        ticketID: 3,
        tags: ['backend', 'API'],
        assignees: [
          {
            username: 'medhavinimathur1804',
            avatar: 'https://github.com/medhavinimathur1804.png',
          },
        ],
      },
      {
        teamName: 'PHOENIX',
        taskTitle: 'Setup redux structure',
        ticketID: 10,
        assignees: [
          {
            username: 'themillenniumfalcon',
            avatar: 'https://github.com/themillenniumfalcon.png',
          },
        ],
      },
      {
        teamName: 'LABS',
        taskTitle: 'Build co-pilot UI',
        ticketID: 4,
        tags: ['frontend', 'ui'],
        assignees: [
          {
            username: 'medhavinimathur1804',
            avatar: 'https://github.com/medhavinimathur1804.png',
          },
        ],
      },
      {
        teamName: 'CHRONOS',
        taskTitle: 'Notification Module',
        ticketID: 5,
        assignees: [
          {
            username: 'themillenniumfalcon',
            avatar: 'https://github.com/themillenniumfalcon.png',
          },
          {
            username: 'medhavinimathur1804',
            avatar: 'https://github.com/medhavinimathur1804.png',
          },
        ],
      },
      {
        teamName: 'PHOENIX',
        taskTitle: 'Editor Design',
        ticketID: 11,
        tags: ['design', 'frontend'],
        assignees: [
          {
            username: 'themillenniumfalcon',
            avatar: 'https://github.com/medhavinimathur1804.png',
          },
        ],
      },
    ],
  },
  {
    listName: '03',
    listItems: [
      {
        teamName: 'CHRONOS',
        taskTitle: 'Project table API tests',
        ticketID: 6,
        tags: ['api', 'backend', 'testing'],
        assignees: [
          {
            username: 'themillenniumfalcon',
            avatar: 'https://github.com/themillenniumfalcon.png',
          },
        ],
      },
      {
        teamName: 'CHRONOS',
        taskTitle: 'Project table fixes',
        ticketID: 9,
        assignees: [
          {
            username: 'themillenniumfalcon',
            avatar: 'https://github.com/themillenniumfalcon.png',
          },
          {
            username: 'medhavinimathur1804',
            avatar: 'https://github.com/medhavinimathur1804.png',
          },
          {
            username: 'communal',
            avatar: 'https://github.com/communal.png',
          },
        ],
      },
    ],
  },
  {
    listName: '04',
    listItems: [
      {
        teamName: 'LUMOS',
        taskTitle: 'Public view links',
        ticketID: 7,
        tags: ['frontend', 'backend'],
        assignees: [
          {
            username: 'themillenniumfalcon',
            avatar: 'https://github.com/themillenniumfalcon.png',
          },
        ],
      },
      {
        teamName: 'LABS',
        taskTitle: 'Command center UI testing',
        ticketID: 12,
        tags: ['ui', 'frontend', 'testing'],
        assignees: [
          {
            username: 'medhavinimathur1804',
            avatar: 'https://github.com/medhavinimathur1804.png',
          },
        ],
      },
      {
        teamName: 'CHRONOS',
        taskTitle: 'Notifictions Phase',
        ticketID: 13,
        assignees: [
          {
            username: 'themillenniumfalcon',
            avatar: 'https://github.com/themillenniumfalcon.png',
          },
        ],
      },
    ],
  },
];
