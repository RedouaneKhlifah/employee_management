import mongoose from "mongoose";

const emploiSchema = mongoose.Schema(
    {
        info_emploi: {
            Titre: {
                type: String,
                trim: true,
                required: true,
                unique: true
            },
            Formation: {
                type: String,
                trim: true,
                required: true
            },
            Spécialité: {
                type: String,
                trim: true,
                required: true
            },
            Expérience: {
                type: String,
                trim: true,
                required: true
            }
        },
        Compétences: [
            {
                competence_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "competence"
                },
                Niveau: {
                    type: Number,
                    required: true
                }
            }
        ],
        history: {
            createdBy: {
                user_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "personne"
                },
                timestamp: Date
            },
            updatedBy: [
                {
                    user_id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "personne"
                    },
                    timestamp: Date
                }
            ]
        }
    },

    {
        timestamps: true,
        strict: false,
        strictPopulate: false
    }
);

const Emploi = mongoose.model("emploi", emploiSchema);

export default Emploi;
