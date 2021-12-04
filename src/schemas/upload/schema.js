import { gql } from 'apollo-server-express'
import { GraphQLUpload } from 'graphql-upload'
import { checkFileSize, generateUniqueFilename, uploadToGoogleCloud } from '../../utilities/index.js'
import { UserInputError } from 'apollo-server-errors';

export const uploadTypeDefs = gql`
scalar Upload

type Mutation {
    uploadFile(file: Upload!): String!
}
`;

export const uploadResolvers = {
    Upload: GraphQLUpload,
    Mutation: {
        uploadFile: async (parent, { file }) => {
            const { filename, mimetype, createReadStream } = await file;
            console.log(file);
            console.log(filename);
            try {

                const fiveMB = 5242880;
                await checkFileSize(createReadStream, fiveMB)
            }
            catch (error) {
                if (typeof error === 'number') {
                    throw new UserInputError('Maximum file size is 1GB');
                }
            }

            const uniqueFilename = generateUniqueFilename(filename);
            try {
                await uploadToGoogleCloud(createReadStream, uniqueFilename)
            } catch (error) {
                console.log(error);
                throw new UserInputError('Error with uploading to Google Cloud');
            }
            console.log(`https://storage.googleapis.com/${process.env.GCP_BUCKET_ID}/${uniqueFilename}`)
            return `https://storage.googleapis.com/${process.env.GCP_BUCKET_ID}/${uniqueFilename}`
        },
    }
}