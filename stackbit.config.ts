import { defineStackbitConfig, DocumentVersion, DocumentVersionWithDocument } from '@stackbit/types';
import { ContentfulContentSource } from '@stackbit/cms-contentful';
import { allModelExtensions } from './sources/contentful/modelExtensions';

class CustomContentfulContentSource extends ContentfulContentSource {
    async getDocumentVersions({ documentId }: { documentId: string; }): Promise<{ versions: DocumentVersion[]; }> {
        const result = await super.getDocumentVersions({ documentId });
        return {
            versions: result.versions.map((version) => ({
                ...version,
                label: `Custom ${version.createdAt}`
            }))
        };
    }

    async getDocumentForVersion({ documentId, versionId }: { documentId: string; versionId: string; }): Promise<{ version: DocumentVersionWithDocument; }> {
        const result = await super.getDocumentForVersion({ documentId, versionId });
        return {
            version: {
                ...result.version,
                label: `Custom ${result.version.createdAt}`
            }
        };
    }
}

const contentfulSource = new CustomContentfulContentSource({
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
    previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
});

const config = defineStackbitConfig({
    stackbitVersion: '~0.5.0',
    ssgName: 'nextjs',
    nodeVersion: '16',
    contentSources: [contentfulSource],
    modelExtensions: allModelExtensions,
    styleObjectModelName: 'ThemeStyle',
    presetReferenceBehavior: 'duplicateContents',
    customContentReload: true,
    // Only needed for duplicate-able projects with content provisioning
    import: {
        type: 'contentful',
        contentFile: 'sources/contentful/import/export.json',
        uploadAssets: true,
        assetsDirectory: 'sources/contentful/import',
        spaceIdEnvVar: 'CONTENTFUL_SPACE_ID',
        deliveryTokenEnvVar: 'CONTENTFUL_DELIVERY_TOKEN',
        previewTokenEnvVar: 'CONTENTFUL_PREVIEW_TOKEN',
        accessTokenEnvVar: 'CONTENTFUL_MANAGEMENT_TOKEN'
    },
    sidebarButtons: [
        {
            label: "Analytics",
            type: "link",
            icon: "analytics",
            url: "/analytics"
        }
    ]
});
export default config;
