import { ModelExtension } from '@stackbit/types';
import { commonFieldGroups, commonFields } from './section-common';

export const GenericSection: ModelExtension = {
    name: 'GenericSection',
    label: 'Section',
    thumbnail: 'https://assets.stackbit.com/components/models/thumbnails/default.png',
    fieldGroups: commonFieldGroups,
    actions: [
        {
            name: 'model_action',
            label: 'Model Action',
            run: async (options) => {
                const logger = options.getLogger();
                logger.debug('running model action');
            }
        }
    ],
    fields: [
        ...commonFields,
        {
            name: 'title',
            type: 'reference',
            actions: [
                {
                    name: 'test',
                    label: 'Title field action',
                    run: async (options) => {
                        await new Promise((resolve) => setTimeout(resolve, 10000));
                        return {
                            state: 'enabled',
                            error: 'Yes baby'
                        };
                    }
                },
                {
                    name: 'doc_action_2',
                    label: 'Doc Action Succcess Long',
                    run: async (options) => {
                        await new Promise((resolve) => setTimeout(resolve, 5000));
                        return {
                            state: 'enabled',
                            success: 'Yes baby'
                        };
                    }
                }
            ]
        },
        {
            type: 'style',
            name: 'styles',
            styles: {
                self: {
                    margin: 'tw0:96',
                    padding: 'tw0:96',
                    flexDirection: '*',
                    alignItems: ['flex-start', 'flex-end', 'center'],
                    justifyContent: ['flex-start', 'flex-end', 'center']
                },
                subtitle: { fontStyle: '*', fontWeight: ['400', '500', '700'], textDecoration: '*', textAlign: '*' },
                text: { textAlign: '*' }
            }
        }
    ]
};
